import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Cpu, 
  Factory as FactoryIcon, 
  History, 
  Settings, 
  Search,
  ClipboardList,
  Plus,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
      active 
        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/40" 
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    )}
  >
    {active && (
      <motion.div 
        layoutId="active-bg"
        className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent opacity-100"
        style={{ zIndex: -1 }}
      />
    )}
    <Icon className={cn("w-5 h-5 relative z-10", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
    {!collapsed && <span className="font-bold whitespace-nowrap relative z-10">{label}</span>}
    {active && !collapsed && (
      <motion.div 
        layoutId="active-indicator"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-white relative z-10" 
      />
    )}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'products', label: 'Sản phẩm', icon: Package },
    { id: 'ai-digitize', label: 'Số hóa AI', icon: Cpu },
    { id: 'planning', label: 'Kế hoạch & Quy trình', icon: ClipboardList },
    { id: 'factories', label: 'Nhà máy', icon: FactoryIcon },
    { id: 'history', label: 'Nhật ký', icon: History },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 transition-all duration-300 relative",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0 shadow-lg shadow-brand-primary/40">
            <span className="text-white font-black text-xl italic">G</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-white">Gốm<span className="text-brand-primary font-black">Core</span></span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-slate-400 group mb-4"
          >
            {collapsed ? <ChevronRight /> : <span className="text-sm font-medium">Thu gọn menu</span>}
          </button>
          
          <div className={cn(
            "p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3 transition-all",
            collapsed && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-slate-900 font-bold shrink-0">
              A
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">Nguyễn Văn A</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Quản trị viên</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative">
        {/* Header */}
        <header className="h-16 bg-slate-900/20 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-white" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white md:block hidden">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative md:block hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm mã sản phẩm..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary w-64 transition-all placeholder:text-slate-500"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Content Scrolling Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-xl tracking-tight text-brand-secondary">Gốm<span className="text-brand-primary">Core</span></span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X />
                </button>
              </div>
              <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
