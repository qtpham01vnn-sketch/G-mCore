import React from 'react';
import { 
  TrendingUp, 
  Package, 
  FileCheck, 
  AlertCircle,
  FileText,
  History,
  Activity,
  Cpu,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_PRODUCTS, MOCK_LOGS } from '../mockData';
import { cn, formatDate } from '../lib/utils';
import { motion } from 'motion/react';

const data = [
  { name: 'Thứ 2', sales: 4000, updates: 24 },
  { name: 'Thứ 3', sales: 3000, updates: 13 },
  { name: 'Thứ 4', sales: 2000, updates: 98 },
  { name: 'Thứ 5', sales: 2780, updates: 39 },
  { name: 'Thứ 6', sales: 1890, updates: 48 },
  { name: 'Thứ 7', sales: 2390, updates: 38 },
  { name: 'Chủ nhật', sales: 3490, updates: 43 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  isPositive?: boolean;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, trend, isPositive, color }: StatCardProps) => (
  <div className="card-base p-6 flex flex-col gap-4 group hover:border-brand-primary/50 transition-all">
    <div className="flex justify-between items-start">
      <div className={cn("p-3 rounded-2xl shadow-lg", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className={cn(
          "flex items-center text-xs font-black px-2 mt-1 rounded-full py-1",
          isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-3xl font-black mt-1 text-white">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Sản phẩm hoạt động" 
          value={MOCK_PRODUCTS.length} 
          icon={Package} 
          trend="+12%" 
          isPositive 
          color="bg-blue-500"
        />
        <StatCard 
          title="Phối liệu AI đã trích" 
          value="128" 
          icon={FileCheck} 
          trend="+40%" 
          isPositive 
          color="bg-brand-primary"
        />
        <StatCard 
          title="Chờ xác nhận OCR" 
          value="12" 
          icon={AlertCircle} 
          color="bg-orange-500"
        />
        <StatCard 
          title="Logs hệ thống" 
          value="1,240" 
          icon={Activity} 
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-white">Hoạt động cập nhật Phối liệu</h2>
              <p className="text-sm text-slate-400 font-medium">Thống kê số lượng version mới theo tuần</p>
            </div>
            <select className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUpdates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#F8FAFC' }}
                  cursor={{ stroke: '#0EA5E9', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="updates" 
                  stroke="#0EA5E9" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUpdates)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-base p-6">
          <h2 className="text-xl font-black text-white mb-6">Nhật ký mới nhất</h2>
          <div className="space-y-6">
            {MOCK_LOGS.map((log, index) => (
              <div key={log.id} className="relative pl-6 pb-6 last:pb-0">
                {index !== MOCK_LOGS.length - 1 && (
                  <div className="absolute left-[7px] top-4 bottom-0 w-px bg-slate-700"></div>
                )}
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-brand-primary bg-slate-900 z-10 shadow-sm shadow-brand-primary"></div>
                <div>
                  <p className="text-sm font-black text-white">
                    {log.userName}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mb-1">{formatDate(log.createdAt)}</p>
                  <div className="p-3 bg-white/5 rounded-lg mt-2 border border-white/5 italic text-sm text-slate-300">
                    "{log.newValue}"
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-black text-brand-primary border border-brand-primary/20 rounded-xl hover:bg-brand-primary/10 transition-colors">
            Xem tất cả nhật ký
          </button>
        </div>
      </div>

      {/* Shortcuts/Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-base p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
             <FileText className="w-5 h-5" />
           </div>
           <div>
             <p className="font-bold text-sm">Xem Phối liệu hiện tại</p>
             <p className="text-xs text-gray-500 italic">Kiểm tra version Active</p>
           </div>
        </div>
        <div className="card-base p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-brand-primary">
           <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
             <Cpu className="w-5 h-5" />
           </div>
           <div>
             <p className="font-bold text-sm">Số hóa file scan mới</p>
             <p className="text-xs text-gray-500 italic">Bắt đầu quy trình AI OCR</p>
           </div>
        </div>
        <div className="card-base p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500">
           <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
             <TrendingUp className="w-5 h-5" />
           </div>
           <div>
             <p className="font-bold text-sm">So sánh Version</p>
             <p className="text-xs text-gray-500 italic">Đối chiếu thay đổi nguyên liệu</p>
           </div>
        </div>
      </div>
    </div>
  );
}
