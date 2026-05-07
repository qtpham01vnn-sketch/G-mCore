import React from 'react';
import { 
  ClipboardList, 
  Target, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const targets = [
  { id: 1, title: 'Tỷ lệ thu hồi loại 1', goal: '95%', current: '93.2%', status: 'warning' },
  { id: 2, title: 'Năng suất lò nung', goal: '3200 m2/ngày', current: '3150 m2/ngày', status: 'optimal' },
  { id: 3, title: 'Tiêu hao năng lượng', goal: '< 1200 kcal/kg', current: '1250 kcal/kg', status: 'warning' },
  { id: 4, title: 'Tỷ lệ lỗi nứt cạnh', goal: '< 0.5%', current: '0.42%', status: 'optimal' },
];

const processes = [
  { 
    id: 'p1', 
    name: 'Quy trình Nghiền hồ (Body Milling)', 
    steps: 6, 
    lastUpdate: '2024-05-10', 
    dept: 'Xưởng Xương',
    tags: ['Xương', 'ISO-9001']
  },
  { 
    id: 'p2', 
    name: 'Quy trình Sấy phun (Spray Drying)', 
    steps: 4, 
    lastUpdate: '2024-04-20', 
    dept: 'Xưởng Xương',
    tags: ['Nhiệt lượng']
  },
  { 
    id: 'p3', 
    name: 'Quy trình Tráng men (Glazing)', 
    steps: 8, 
    lastUpdate: '2024-05-01', 
    dept: 'Xưởng Men',
    tags: ['Men', 'Bề mặt']
  },
  { 
    id: 'p4', 
    name: 'Quy trình Nung (Firing Control)', 
    steps: 12, 
    lastUpdate: '2024-05-15', 
    dept: 'Lò nung',
    tags: ['Lò nung', 'SOP']
  },
];

export default function Planning() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Kế hoạch & Quy trình</h2>
          <p className="text-slate-400 font-medium">Thiết lập mục tiêu sản xuất và quản lý quy trình vận hành tiêu chuẩn (SOP)</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Cấu hình chỉ số (KPI)
          </button>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Tạo Kế hoạch mới
          </button>
        </div>
      </div>

      {/* Production Targets (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {targets.map(target => (
          <div key={target.id} className="card-base p-6 group hover:border-brand-primary transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "p-2 rounded-lg",
                target.status === 'optimal' ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"
              )}>
                <Target size={20} />
              </div>
              <TrendingUp className="w-4 h-4 text-slate-600 group-hover:text-brand-primary transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">{target.title}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-black text-white">{target.current}</h4>
              <span className="text-xs text-slate-500 font-bold">/ mục tiêu {target.goal}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: target.status === 'optimal' ? '90%' : '70%' }}
                className={cn(
                  "h-full rounded-full",
                  target.status === 'optimal' ? "bg-green-500" : "bg-orange-500"
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Operating Processes (SOPs) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="text-brand-primary" size={20} />
              <h3 className="font-black text-white text-lg">Quy trình Vận hành Tiêu chuẩn (SOP)</h3>
            </div>
            <button className="text-brand-primary text-xs font-black uppercase tracking-widest hover:underline">
              Xem toàn bộ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processes.map(process => (
              <div key={process.id} className="card-base p-5 hover:bg-white/5 cursor-pointer transition-all border-l-4 border-l-brand-primary/20 hover:border-l-brand-primary">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-white text-sm group-hover:text-brand-primary transition-colors">
                    {process.name}
                  </h4>
                  <div className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[9px] font-black rounded uppercase">
                    {process.dept}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {process.lastUpdate}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={12} /> {process.steps} bước
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {process.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full p-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-black text-sm hover:border-brand-primary hover:text-brand-primary transition-all">
            <Plus size={18} />
            THÊM QUY TRÌNH MỚI
          </button>
        </div>

        {/* Target Details / Quick Actions */}
        <div className="space-y-6">
          <div className="card-base p-6 bg-brand-primary/5 border-brand-primary/20">
            <h3 className="font-black text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-brand-primary" size={18} />
              Phân tích Mục tiêu
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Tỷ lệ thành phẩm</p>
                  <span className="text-green-400 text-xs font-black">+2.4%</span>
                </div>
                <p className="text-white font-black text-sm">Vượt kế hoạch tuần 02</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Tiêu hao vật tư</p>
                  <span className="text-orange-400 text-xs font-black">-1.5%</span>
                </div>
                <p className="text-white font-black text-sm">Cần tối ưu bài Phối PN25C</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/30 hover:scale-105 transition-transform active:scale-95">
              TẢI BÁO CÁO MỤC TIÊU
            </button>
          </div>

          <div className="card-base p-6">
            <h3 className="font-black text-white mb-4 flex items-center gap-2 text-sm">
              <AlertCircle className="text-orange-400" size={18} />
              Cảnh báo Quy trình
            </h3>
            <div className="space-y-4 text-sm">
              <p className="text-slate-400 leading-relaxed font-medium">
                Quy trình <span className="text-white font-bold">Nghiền hồ</span> đã quá 6 tháng chưa cập nhật SOP. Hệ thống yêu cầu review lại các bước lọc tạp chất.
              </p>
              <button className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:gap-3 transition-all">
                BẮT ĐẦU REVIEW <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
