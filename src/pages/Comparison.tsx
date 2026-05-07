import React from 'react';
import { 
  ArrowLeftRight, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  History,
  AlertCircle,
  FileText
} from 'lucide-react';
import { MOCK_VERSIONS, MOCK_MATERIALS } from '../mockData';
import { cn } from '../lib/utils';

export default function VersionComparison() {
  // Simulating comparison between V2 and V3 of PN25C
  const materialsV2 = [
    { name: 'Đất sét PND-VC01', ratio: 32.0 },
    { name: 'Cao lanh K12', ratio: 12.0 },
    { name: 'Tràng thạch nội', ratio: 45.0 },
    { name: 'Bột đá vôi', ratio: 11.0 },
  ];

  const materialsV3 = MOCK_MATERIALS.map(m => ({ name: m.materialName, ratio: m.ratioPercent }));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-white">So sánh Version Phối liệu</h2>
          <p className="text-slate-400 font-medium">Đối chiếu sự thay đổi giữa các phiên bản công thức</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-2 border border-white/10 rounded-xl">
           <div className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-black text-white border border-white/5">PN25C</div>
           <div className="text-slate-600">/</div>
           <div className="px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-lg text-sm font-black border border-brand-primary/20">V2 vs V3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Summary of changes */}
        <div className="card-base p-6 space-y-6">
           <div className="flex items-center gap-3 text-brand-primary">
             <ArrowLeftRight size={24} />
             <h3 className="text-lg font-black text-white">Phân tích thay đổi AI</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Old Version</p>
                <p className="font-black text-white">V2 - 10/03/2024</p>
              </div>
              <div className="p-4 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                <p className="text-[10px] text-brand-primary font-black uppercase mb-1">New Version</p>
                <p className="font-black text-white">V3 - 01/05/2024</p>
              </div>
           </div>

           <div className="space-y-4">
             <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3">
                <AlertCircle className="text-blue-400 shrink-0" size={20} />
                <p className="text-sm text-blue-200 leading-relaxed italic font-medium">
                  "AI nhận thấy sự gia tăng rõ rệt (<strong>+3%</strong>) của Cao lanh K12 nhằm cải thiện độ dẻo của xương, đồng thời giảm nhẹ tỷ lệ Tràng thạch để cân bằng độ co rút."
                </p>
             </div>
           </div>

           <div className="space-y-2">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">Điểm khác biệt chính:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400"></div>
                  Tăng Cao lanh K12 (+3.0%)
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-sm shadow-red-400"></div>
                  Giảm Tràng Thạch nội (-5.0%)
                </li>
              </ul>
           </div>
        </div>

        {/* Right Side: Detailed Table */}
        <div className="card-base overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
             <h3 className="font-black text-white">Bảng đối chiếu Nguyên liệu</h3>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-slate-500 font-black text-left uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Nguyên liệu</th>
                  <th className="px-6 py-4">V2 (%)</th>
                  <th className="px-6 py-4">V3 (%)</th>
                  <th className="px-6 py-4 text-center">Biến đổi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {materialsV3.map((m, idx) => {
                  const oldRatio = materialsV2.find(o => o.name === m.name)?.ratio || 0;
                  const diff = m.ratio - oldRatio;
                  return (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-black text-white">{m.name}</td>
                      <td className="px-6 py-4 text-slate-500">{oldRatio.toFixed(1)}%</td>
                      <td className="px-6 py-4 font-black text-white">{m.ratio.toFixed(1)}%</td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "flex items-center justify-center gap-1 font-black rounded-full px-2 py-0.5 w-max mx-auto shadow-sm",
                          diff > 0 ? "text-green-400 bg-green-500/10 shadow-green-500/10" : diff < 0 ? "text-red-400 bg-red-500/10 shadow-red-500/10" : "text-slate-500 bg-white/5"
                        )}>
                          {diff > 0 ? <ArrowUp size={12} /> : diff < 0 ? <ArrowDown size={12} /> : <Minus size={12} />}
                          <span>{Math.abs(diff).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Comparison History Sidebar-like list */}
      <div className="card-base p-6">
         <div className="flex items-center gap-3 mb-6">
            <History size={20} className="text-slate-500" />
            <h3 className="font-black text-white uppercase tracking-widest text-sm">Các so sánh gần đây</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: 'DG60S', versions: 'V1 -> V2', date: '2 ngày trước' },
              { code: 'MT80G', versions: 'V2 -> V3', date: '5 ngày trước' },
              { code: 'PN25C', versions: 'V1 -> V3', date: '1 tuần trước' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-brand-primary/40 transition-all cursor-pointer group">
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-white">{item.code}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{item.date}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-brand-primary font-mono font-bold tracking-tighter">{item.versions}</span>
                    <span className="text-[10px] text-brand-primary opacity-0 group-hover:opacity-100 flex items-center transition-opacity font-black">
                      CHI TIẾT <ChevronDown className="w-3 h-3 -rotate-90" />
                    </span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
