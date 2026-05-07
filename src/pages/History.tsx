import React from 'react';
import { 
  History as HistoryIcon,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Database,
  Cpu,
  FileEdit
} from 'lucide-react';
import { MOCK_LOGS } from '../mockData';
import { formatDate, cn } from '../lib/utils';

export default function HistoryPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'AI_EXTRACT': return <Cpu className="text-brand-primary" size={16} />;
      case 'CREATE': return <Database className="text-green-400" size={16} />;
      case 'UPDATE': return <FileEdit className="text-brand-accent" size={16} />;
      default: return <HistoryIcon className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Nhật ký Hệ thống</h2>
          <p className="text-slate-400 font-medium">Theo dõi lịch sử thay đổi phối liệu và vận hành</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all">
             XUẤT BÁO CÁO (EXCEL)
           </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-4 bg-white/5 rounded-xl border border-white/5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo người dùng, sản phẩm..."
            className="w-full bg-slate-900 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary placeholder:text-slate-600"
          />
        </div>
        <select className="bg-slate-900 border border-white/5 text-slate-400 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-primary">
          <option>Tất cả hành động</option>
          <option>Trích xuất AI</option>
          <option>Cập nhật Version</option>
          <option>Xử lý lỗi</option>
        </select>
        <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-brand-primary transition-colors">
          <Filter size={14} />
          Lọc nâng cao
        </div>
      </div>

      <div className="card-base divide-y divide-white/10">
        {MOCK_LOGS.map((log) => (
          <div key={log.id} className="p-6 hover:bg-white/5 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                {getIcon(log.actionType)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-sm">{log.userName}</span>
                  <span className="text-slate-600">•</span>
                  <span className={cn(
                    "text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest",
                    log.actionType === 'AI_EXTRACT' ? "bg-brand-primary/20 text-brand-primary" : "bg-slate-800 text-slate-400"
                  )}>
                    {log.actionType}
                  </span>
                </div>
                <p className="text-sm text-slate-300 font-medium">
                  {log.actionType === 'AI_EXTRACT' ? 'Đã trích xuất thành công dữ liệu từ' : 'Đã thay đổi trạng thái'} 
                  <span className="mx-1 text-brand-accent font-bold">#{log.entityId}</span>
                </p>
                <div className="flex items-center gap-4 py-2">
                  {log.oldValue && (
                    <div className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 font-bold rounded">
                      TRƯỚC: {log.oldValue}
                    </div>
                  )}
                  {log.oldValue && <ArrowRight size={12} className="text-slate-600" />}
                  <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-bold rounded">
                    SAU: {log.newValue}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-tighter">
                <Clock size={12} />
                {formatDate(log.createdAt)}
              </div>
              <button className="text-[10px] font-black text-brand-primary hover:text-white transition-colors uppercase tracking-widest opacity-0 group-hover:opacity-100">
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
