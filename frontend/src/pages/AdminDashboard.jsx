import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck, LogOut, RefreshCw, Search, Download, Trash2, Mail, Phone,
  Building, Calendar, Clock, CheckCircle2, MessageSquare, Filter,
  Eye, X, ArrowUpRight, Sparkles, AlertCircle, FileSpreadsheet, Bot, Send
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import {
  fetchAllInquiries,
  fetchAllEarlyAccess,
  updateInquiryStatus,
  deleteInquiry,
  updateEarlyAccessStatus,
  deleteEarlyAccess,
  exportToCSV,
  adminLogout,
  getAdminUser,
} from "@/lib/adminApi";

const STATUS_BADGES = {
  new: { label: "New Lead", bg: "bg-electric/10 text-electric border-electric/30" },
  in_progress: { label: "In Progress", bg: "bg-amber-400/10 text-amber-300 border-amber-400/30" },
  contacted: { label: "Contacted", bg: "bg-royal-400/10 text-royal-400 border-royal-400/30" },
  closed: { label: "Closed", bg: "bg-slate-700/30 text-slate-400 border-white/10" },
};

const formatDate = (isoString) => {
  if (!isoString) return "—";
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const [activeTab, setActiveTab] = useState("inquiries"); // "inquiries" | "early_access"
  const [inquiries, setInquiries] = useState([]);
  const [earlyAccess, setEarlyAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // for modal
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [inqData, eaData] = await Promise.all([
        fetchAllInquiries(),
        fetchAllEarlyAccess(),
      ]);
      setInquiries(inqData);
      setEarlyAccess(eaData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const handleStatusChange = async (id, newStatus, isEarlyAccess = false) => {
    if (isEarlyAccess) {
      setEarlyAccess((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      await updateEarlyAccessStatus(id, newStatus);
    } else {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      await updateInquiryStatus(id, newStatus);
    }
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = async (id, isEarlyAccess = false) => {
    if (isEarlyAccess) {
      setEarlyAccess((prev) => prev.filter((item) => item.id !== id));
      await deleteEarlyAccess(id);
    } else {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      await deleteInquiry(id);
    }
    setConfirmDeleteId(null);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch =
        (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.organization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.service || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.message || "").toLowerCase().includes(searchTerm.toLowerCase());

      const itemStatus = item.status || "new";
      const matchesStatus = statusFilter === "all" || itemStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchTerm, statusFilter]);

  // Filtered early access
  const filteredEarlyAccess = useMemo(() => {
    return earlyAccess.filter((item) => {
      const matchesSearch =
        (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.organization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.product || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.note || "").toLowerCase().includes(searchTerm.toLowerCase());

      const itemStatus = item.status || "new";
      const matchesStatus = statusFilter === "all" || itemStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [earlyAccess, searchTerm, statusFilter]);

  // Stats
  const totalInquiries = inquiries.length;
  const newInquiriesCount = inquiries.filter((i) => (i.status || "new") === "new").length;
  const totalEarlyCount = earlyAccess.length;
  const newEarlyCount = earlyAccess.filter((i) => (i.status || "new") === "new").length;

  return (
    <>
      <SEO
        title="Admin Dashboard | MR AI Software Technologies"
        description="Review customer inquiries, leads, and early access applications."
        path="/admin"
      />

      <div className="min-h-screen bg-navy text-slate-100 flex flex-col pt-24 pb-16">
        {/* Top bar */}
        <header className="border-b border-white/[0.08] bg-navy-800/80 backdrop-blur-md sticky top-0 z-30">
          <div className="container-x py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" aria-label="MR AI Home">
                <Logo />
              </Link>
              <div className="h-5 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-royal/20 text-electric border border-electric/30">
                  <ShieldCheck size={13} />
                  Admin Panel
                </span>
                <span className="text-xs text-slate-400 hidden md:inline">
                  {adminUser?.email || "admin@mrai.in"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                title="Refresh queries list"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-navy-700/60 hover:bg-navy-700 text-xs font-medium text-slate-300 hover:text-white transition-all disabled:opacity-50"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-navy-700/40 hover:bg-navy-700 text-xs font-medium text-slate-300 hover:text-white transition-all"
              >
                <ArrowUpRight size={13} />
                <span className="hidden sm:inline">Live Website</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-medium text-rose-300 transition-all"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="container-x flex-1 py-8">
          {/* Welcome & Overview Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-2">Operations Control</p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Client Inquiries & Early Access
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage all incoming project proposals, contacts, and software beta testers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  exportToCSV(
                    activeTab === "inquiries" ? filteredInquiries : filteredEarlyAccess,
                    activeTab === "inquiries" ? "mrai_contact_inquiries" : "mrai_early_access"
                  )
                }
                disabled={activeTab === "inquiries" ? !filteredInquiries.length : !filteredEarlyAccess.length}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-royal hover:bg-royal-600 text-white text-xs font-medium shadow-md shadow-royal/20 transition-all disabled:opacity-40"
              >
                <Download size={14} />
                <span>Export to CSV ({activeTab === "inquiries" ? filteredInquiries.length : filteredEarlyAccess.length})</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card-dark border border-white/10 p-5 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-slate-400">Total Inquiries</span>
                <span className="p-2 rounded-lg bg-royal/10 text-electric border border-royal/30">
                  <MessageSquare size={16} />
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{totalInquiries}</p>
              <p className="text-xs text-slate-500 mt-1">Website contact requests</p>
            </div>

            <div className="card-dark border border-white/10 p-5 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-slate-400">New Inquiries</span>
                <span className="p-2 rounded-lg bg-electric/10 text-electric border border-electric/30">
                  <Sparkles size={16} />
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-electric mt-2">{newInquiriesCount}</p>
              <p className="text-xs text-slate-500 mt-1">Awaiting your response</p>
            </div>

            <div className="card-dark border border-white/10 p-5 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-slate-400">Early Access</span>
                <span className="p-2 rounded-lg bg-royal/10 text-royal-400 border border-royal/30">
                  <Bot size={16} />
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">{totalEarlyCount}</p>
              <p className="text-xs text-slate-500 mt-1">Product beta waitlist</p>
            </div>

            <div className="card-dark border border-white/10 p-5 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase text-slate-400">New Early Access</span>
                <span className="p-2 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <Clock size={16} />
                </span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-amber-300 mt-2">{newEarlyCount}</p>
              <p className="text-xs text-slate-500 mt-1">Pending onboarding</p>
            </div>
          </div>

          {/* Main Controls Card */}
          <div className="card-dark border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {/* Tabs Bar */}
            <div className="flex border-b border-white/[0.08] bg-navy-800/60 px-4 sm:px-6 pt-3 gap-2">
              <button
                onClick={() => {
                  setActiveTab("inquiries");
                  setStatusFilter("all");
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === "inquiries"
                    ? "border-electric text-electric font-semibold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare size={16} />
                <span>Contact Inquiries</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.07] text-slate-300">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("early_access");
                  setStatusFilter("all");
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === "early_access"
                    ? "border-electric text-electric font-semibold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Bot size={16} />
                <span>Early Access Applications</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.07] text-slate-300">
                  {earlyAccess.length}
                </span>
              </button>
            </div>

            {/* Search & Filter Controls */}
            <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-navy-900/40">
              <div className="relative flex-1 max-w-md">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={
                    activeTab === "inquiries"
                      ? "Search by name, email, service, organization..."
                      : "Search by name, email, product..."
                  }
                  className="w-full bg-navy-800/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-electric/60"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-500 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-navy-800/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-electric/60"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Leads</option>
                  <option value="in_progress">In Progress</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* List / Table Content */}
            <div className="overflow-x-auto">
              {activeTab === "inquiries" ? (
                // CONTACT INQUIRIES VIEW
                filteredInquiries.length === 0 ? (
                  <div className="py-16 text-center">
                    <MessageSquare size={36} className="mx-auto text-slate-600 mb-3" />
                    <p className="text-sm font-medium text-slate-300">No inquiries found</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      {searchTerm ? "Try searching for a different keyword or change status filter." : "When customers fill out the Contact form on your website, they will appear right here."}
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.08] bg-navy-800/40 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4 sm:px-6">Date</th>
                        <th className="py-3 px-4">Client / Organization</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Message Preview</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {filteredInquiries.map((item) => {
                        const currentStatus = item.status || "new";
                        const badge = STATUS_BADGES[currentStatus] || STATUS_BADGES.new;
                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-slate-400 font-mono text-xs">
                              {formatDate(item.created_at)}
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="font-semibold text-white">{item.name}</p>
                              {item.organization && (
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Building size={12} className="text-slate-500" />
                                  {item.organization}
                                </p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="space-y-1">
                                <a
                                  href={`mailto:${item.email}`}
                                  className="text-slate-300 hover:text-electric flex items-center gap-1.5 text-xs transition-colors"
                                >
                                  <Mail size={12} className="text-electric" />
                                  {item.email}
                                </a>
                                {item.phone && (
                                  <a
                                    href={`tel:${item.phone}`}
                                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
                                  >
                                    <Phone size={12} className="text-slate-500" />
                                    {item.phone}
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-royal/10 text-royal-400 border border-royal/30">
                                {item.service}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <p className="truncate text-slate-300 text-xs">
                                {item.message}
                              </p>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={currentStatus}
                                onChange={(e) => handleStatusChange(item.id, e.target.value, false)}
                                className={`text-xs rounded-lg px-2.5 py-1 border font-medium bg-navy-800 focus:outline-none cursor-pointer ${badge.bg}`}
                              >
                                <option value="new">New Lead</option>
                                <option value="in_progress">In Progress</option>
                                <option value="contacted">Contacted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedItem({ ...item, isEarlyAccess: false })}
                                  title="View full details"
                                  className="p-1.5 rounded-lg border border-white/10 hover:border-electric/50 text-slate-400 hover:text-electric hover:bg-electric/5 transition-all"
                                >
                                  <Eye size={15} />
                                </button>
                                {confirmDeleteId === item.id ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleDelete(item.id, false)}
                                      className="px-2 py-1 rounded bg-rose-500 text-white text-[11px] font-medium hover:bg-rose-600 transition-colors"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => setConfirmDeleteId(null)}
                                      className="p-1 rounded text-slate-400 hover:text-white"
                                    >
                                      <X size={13} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setConfirmDeleteId(item.id)}
                                    title="Delete inquiry"
                                    className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )
              ) : (
                // EARLY ACCESS VIEW
                filteredEarlyAccess.length === 0 ? (
                  <div className="py-16 text-center">
                    <Bot size={36} className="mx-auto text-slate-600 mb-3" />
                    <p className="text-sm font-medium text-slate-300">No early access requests found</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Requests for MR EduTech, HealthTech, Commerce, and AI Assistant waitlists will appear here.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.08] bg-navy-800/40 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4 sm:px-6">Date</th>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Requested Product</th>
                        <th className="py-3 px-4">Notes / Use Case</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {filteredEarlyAccess.map((item) => {
                        const currentStatus = item.status || "new";
                        const badge = STATUS_BADGES[currentStatus] || STATUS_BADGES.new;
                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap text-slate-400 font-mono text-xs">
                              {formatDate(item.created_at)}
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="font-semibold text-white">{item.name}</p>
                              {item.organization && (
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Building size={12} className="text-slate-500" />
                                  {item.organization}
                                </p>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <a
                                href={`mailto:${item.email}`}
                                className="text-slate-300 hover:text-electric flex items-center gap-1.5 text-xs transition-colors"
                              >
                                <Mail size={12} className="text-electric" />
                                {item.email}
                              </a>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium uppercase bg-royal/10 text-electric border border-electric/30">
                                {item.product}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <p className="truncate text-slate-300 text-xs">
                                {item.note || "—"}
                              </p>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={currentStatus}
                                onChange={(e) => handleStatusChange(item.id, e.target.value, true)}
                                className={`text-xs rounded-lg px-2.5 py-1 border font-medium bg-navy-800 focus:outline-none cursor-pointer ${badge.bg}`}
                              >
                                <option value="new">New Lead</option>
                                <option value="in_progress">In Progress</option>
                                <option value="contacted">Contacted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedItem({ ...item, isEarlyAccess: true })}
                                  title="View full details"
                                  className="p-1.5 rounded-lg border border-white/10 hover:border-electric/50 text-slate-400 hover:text-electric hover:bg-electric/5 transition-all"
                                >
                                  <Eye size={15} />
                                </button>
                                {confirmDeleteId === item.id ? (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleDelete(item.id, true)}
                                      className="px-2 py-1 rounded bg-rose-500 text-white text-[11px] font-medium hover:bg-rose-600 transition-colors"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => setConfirmDeleteId(null)}
                                      className="p-1 rounded text-slate-400 hover:text-white"
                                    >
                                      <X size={13} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setConfirmDeleteId(item.id)}
                                    title="Delete application"
                                    className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )
              )}
            </div>
          </div>
        </main>

        {/* Detailed Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md">
            <div className="card-dark border border-white/10 rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="eyebrow">
                    {selectedItem.isEarlyAccess ? "Early Access Application" : "Client Project Inquiry"}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedItem.name}</h3>
                  {selectedItem.organization && (
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Building size={13} className="text-slate-500" />
                      {selectedItem.organization}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-5 space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-navy-800/60 border border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Email Address</span>
                    <a
                      href={`mailto:${selectedItem.email}`}
                      className="text-electric hover:underline block truncate font-medium mt-0.5"
                    >
                      {selectedItem.email}
                    </a>
                  </div>
                  {selectedItem.phone && (
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase">Phone</span>
                      <a
                        href={`tel:${selectedItem.phone}`}
                        className="text-slate-200 hover:text-electric block truncate font-medium mt-0.5"
                      >
                        {selectedItem.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      {selectedItem.isEarlyAccess ? "Product" : "Service Requested"}
                    </span>
                    <p className="text-slate-200 font-medium mt-0.5">
                      {selectedItem.service || selectedItem.product}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Date Submitted</span>
                    <p className="text-slate-400 mt-0.5 font-mono text-xs">
                      {formatDate(selectedItem.created_at)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                    {selectedItem.isEarlyAccess ? "Applicant Note / Requirements:" : "Project Description:"}
                  </h4>
                  <div className="p-4 rounded-xl bg-navy-800 border border-white/[0.06] text-slate-200 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {selectedItem.message || selectedItem.note || "No additional message provided."}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Status:</span>
                    <select
                      value={selectedItem.status || "new"}
                      onChange={(e) =>
                        handleStatusChange(selectedItem.id, e.target.value, selectedItem.isEarlyAccess)
                      }
                      className="text-xs bg-navy-800 border border-white/10 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
                    >
                      <option value="new">New Lead</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <a
                    href={`mailto:${selectedItem.email}?subject=Regarding your inquiry with MR AI Software Technologies`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-royal hover:bg-royal-600 text-white text-xs font-medium transition-colors"
                  >
                    <Send size={13} />
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
