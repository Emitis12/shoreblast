
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import ServicesManagement from "./ServicesManagement";
import ProjectsManagement from "./ProjectsManagement";
import ClienteleManagement from "./ClienteleManagement";
import EnquiriesManagement from "./EnquiriesManagement";
import CareerApplicationsManagement from "./CareerApplicationsManagement";
import NewsManagement from "./NewsManagement";

import {
  LayoutDashboard,
  BriefcaseBusiness,
  FolderKanban,
  Users,
  Mail,
  FileUser,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Activity,
  Clock3,
  Loader2,
  ExternalLink,
  Newspaper,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Services", icon: BriefcaseBusiness },
  { label: "Projects", icon: FolderKanban },
  { label: "Clientele", icon: Users },
  { label: "Enquiries", icon: Mail },
  { label: "Career Applications", icon: FileUser },
  { label: "News & Events", icon: Newspaper },
  { label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Overview");
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    services: 0,
    projects: 0,
    clients: 0,
    enquiries: 0,
    applications: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchDashboardData = async () => {
      setLoading(true);
      setDashboardError("");

      try {
        const [
          servicesResult,
          projectsResult,
          clientsResult,
          enquiriesResult,
          applicationsResult,
          recentResult,
        ] = await Promise.all([
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("clients").select("id", { count: "exact", head: true }),
          supabase.from("enquiries").select("id", { count: "exact", head: true }),
          supabase.from("job_applications").select("id", { count: "exact", head: true }),
          supabase
            .from("enquiries")
            .select("id, name, email, message, status, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        const results = [
          servicesResult,
          projectsResult,
          clientsResult,
          enquiriesResult,
          applicationsResult,
          recentResult,
        ];

        const failed = results.find((result) => result.error);

        if (failed) throw failed.error;

        if (!mounted) return;

        setStats({
          services: servicesResult.count ?? 0,
          projects: projectsResult.count ?? 0,
          clients: clientsResult.count ?? 0,
          enquiries: enquiriesResult.count ?? 0,
          applications: applicationsResult.count ?? 0,
        });

        setRecentEnquiries(recentResult.data ?? []);
      } catch (error) {
        if (mounted) {
          setDashboardError(
            error.message || "Unable to load dashboard information."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      alert(error.message || "Unable to sign out.");
    }
  };

  const statCards = [
    { label: "Services", value: stats.services, icon: BriefcaseBusiness },
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "Clientele", value: stats.clients, icon: Users },
    { label: "Enquiries", value: stats.enquiries, icon: Mail },
    { label: "Applications", value: stats.applications, icon: FileUser },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex text-[#10283f]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-72 h-screen bg-[#091b2b] text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-7 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                Shore Blast
              </p>
              <h2 className="text-xl font-bold mt-1">Admin Portal</h2>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-300"
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold px-4 mb-4">
            Management
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setActivePage(item.label);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-[#c69a55] text-[#091b2b]"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#c69a55] text-[#091b2b] flex items-center justify-center font-bold">
              {(profile?.full_name || "A").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {profile?.full_name || "Administrator"}
              </p>
              <p className="text-xs text-gray-400">Super Administrator</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-sm text-gray-300 hover:text-red-400 transition"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-5 md:px-8 py-5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-xs text-gray-400 font-medium">
                SHORE BLAST ENERGY / ADMIN
              </p>
              <h1 className="text-xl md:text-2xl font-bold mt-1">
                {activePage}
              </h1>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-[#183f5c] hover:text-[#c69a55]"
          >
            <ExternalLink size={17} />
            <span className="hidden sm:inline">View Website</span>
          </a>
        </header>

        <div className="p-5 md:p-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="animate-spin text-[#c69a55]" size={36} />
            </div>
          ) : (
            <>
              {dashboardError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
                  {dashboardError}
                </div>
              )}

              {activePage === "Overview" ? (
                <>
                  <div className="mb-8">
                    <p className="text-gray-500 text-sm">
                      Welcome back, {profile?.full_name || "Administrator"}.
                    </p>
                    <h2 className="text-2xl font-bold mt-1">
                      Website Overview
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {statCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.label}
                          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-500 text-sm">
                                {card.label}
                              </p>
                              <p className="text-3xl font-bold mt-3">
                                {card.value}
                              </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-[#f4f6f8] flex items-center justify-center text-[#c69a55]">
                              <Icon size={23} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                    <section className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">
                            Recent Enquiries
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            Latest website submissions
                          </p>
                        </div>
                        <Activity className="text-[#c69a55]" />
                      </div>

                      <div className="p-6">
                        {recentEnquiries.length === 0 ? (
                          <p className="text-gray-400 text-sm py-8 text-center">
                            No enquiries have been submitted yet.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {recentEnquiries.map((enquiry) => (
                              <div
                                key={enquiry.id}
                                className="border-b border-gray-100 pb-4 last:border-0"
                              >
                                <div className="flex justify-between gap-3">
                                  <p className="font-semibold text-sm">
                                    {enquiry.name}
                                  </p>
                                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full capitalize">
                                    {enquiry.status}
                                  </span>
                                </div>

                                <p className="text-xs text-gray-400 mt-1">
                                  {enquiry.email}
                                </p>

                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                  {enquiry.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>

                    <section className="bg-[#10283f] text-white rounded-2xl p-6 shadow-sm">
                      <ShieldCheck size={30} className="text-[#c69a55]" />

                      <h3 className="font-bold text-lg mt-5">
                        Administrator Access
                      </h3>

                      <p className="text-gray-300 text-sm mt-2">
                        Your account is authenticated through Supabase.
                        Website management access is restricted to the
                        authorized Super Administrator.
                      </p>

                      <div className="mt-6 pt-5 border-t border-white/10">
                        <p className="text-xs text-gray-400">SIGNED IN AS</p>
                        <p className="text-sm font-semibold mt-2 break-all">
                          {user?.email}
                        </p>
                      </div>
                    </section>
                  </div>
                </>
              ) : activePage === "Services" ? (
  <ServicesManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
) : activePage === "Projects" ? (
  <ProjectsManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
  ) : activePage === "Clientele" ? (
  <ClienteleManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
  ) : activePage === "Enquiries" ? (
  <EnquiriesManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
  ) : activePage === "Career Applications" ? (
  <CareerApplicationsManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
  ) : activePage === "News & Events" ? (
  <NewsManagement
    onDataChanged={() =>
      setRefreshKey((current) => current + 1)
    }
  />
) : (
  <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
    <div className="w-14 h-14 rounded-xl bg-[#f4f6f8] flex items-center justify-center text-[#c69a55]">
      {React.createElement(
        navigation.find((item) => item.label === activePage)?.icon || Clock3,
        { size: 27 }
      )}
    </div>

    <h2 className="text-xl font-bold mt-5">
      {activePage}
    </h2>

    <p className="text-gray-500 mt-2 text-sm max-w-xl">
      This management module will be connected to your Supabase
      database in the next development stage. Your existing
      website content remains unchanged.
    </p>
  </section>
)}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
