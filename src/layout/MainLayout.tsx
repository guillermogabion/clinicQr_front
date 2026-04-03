import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FlaskConical, FileText, QrCode, LogOut, Menu, X, ChevronRight, UserCog
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const getNavItems = (role: string) => {
  const items = [
    { to: '/',               label: 'Dashboard',     icon: LayoutDashboard, exact: true },
    { to: '/patients',       label: 'Patients',      icon: Users },
    { to: '/prescriptions',  label: 'Prescriptions', icon: FileText },
    { to: '/results',        label: 'Lab Results',   icon: FlaskConical },
  ];
  if (role === 'ADMIN') {
    items.push({ to: '/users', label: 'User Accounts', icon: UserCog, exact: false });
  }
  return items;
};

const roleBadgeColor: Record<string, string> = {
  ADMIN:    'bg-purple-100 text-purple-700',
  DOCTOR:   'bg-blue-100 text-blue-700',
  LAB_TECH: 'bg-green-100 text-green-700',
  PATIENT:  'bg-orange-100 text-orange-700',
};

export default function MainLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = getNavItems(user?.role || '');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <QrCode className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">ClinicQR</p>
            <p className="text-xs text-slate-400">Lab Result System</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} size={18} />
                  {label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-brand-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${roleBadgeColor[user?.role || 'LAB_TECH']}`}>
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100">
            <Menu size={20} />
          </button>
          <span className="font-semibold text-slate-900">ClinicQR</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
