import React from 'react';
import { 
  Factory as FactoryIcon, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Activity,
  Warehouse,
  Wind,
  Flame,
  Plus
} from 'lucide-react';
import { MOCK_FACTORIES } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Factories() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Quản lý Hệ thống Nhà máy</h2>
          <p className="text-slate-400 font-medium">Cấu trục xưởng, dây chuyền và lò nung trực thuộc</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Thêm Nhà máy
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_FACTORIES.map((factory) => (
          <div key={factory.id} className="card-base group">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-brand-primary/10">
                    <FactoryIcon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{factory.name}</h3>
                    <p className="text-brand-primary font-bold font-mono text-sm uppercase tracking-widest">{factory.code}</p>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 font-medium">
                      <MapPin size={12} />
                      {factory.address}
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                  factory.status === 'active' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  {factory.status === 'active' ? 'Đang vận hành' : 'Bảo trì'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Xưởng</p>
                   <p className="text-lg font-black text-white">04</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Dây chuyền</p>
                   <p className="text-lg font-black text-white">12</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                   <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Lò nung</p>
                   <p className="text-lg font-black text-white">06</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Đơn vị tiêu biểu:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Xưởng Xương 1', icon: Warehouse },
                    { name: 'Xưởng Men A', icon: Wind },
                    { name: 'Lò nung SACMI', icon: Flame },
                  ].map((unit, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/5 text-[11px] font-bold text-slate-300">
                      <unit.icon size={14} className="text-brand-primary" />
                      {unit.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-8 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between group-hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Xem chi tiết cơ sở hạ tầng</span>
              <ChevronRight size={18} text-slate-500 />
            </div>
          </div>
        ))}

        {/* Add Factory Card */}
        <div className="card-base border-dashed border-2 border-white/10 flex flex-col items-center justify-center p-12 gap-4 group hover:bg-white/5 hover:border-brand-primary transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-brand-primary group-hover:scale-110 transition-all">
             <Plus size={32} />
           </div>
           <p className="font-black text-slate-500 uppercase tracking-widest group-hover:text-white">Thêm cơ sở mới</p>
        </div>
      </div>
    </div>
  );
}
