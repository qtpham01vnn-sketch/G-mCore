import React from 'react';
import { 
  ArrowLeft, 
  Beaker, 
  ShieldCheck, 
  Clock, 
  Edit3, 
  FileText, 
  Layers,
  Thermometer,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_VERSIONS, MOCK_MATERIALS, MOCK_SPECS } from '../mockData';
import { cn, formatDate } from '../lib/utils';
import { motion } from 'motion/react';

interface Props {
  productId: string;
  onBack: () => void;
}

export default function FormulaDetail({ productId, onBack }: Props) {
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
  const activeVersion = MOCK_VERSIONS.find(v => v.id === product.currentFormulaVersionId) || MOCK_VERSIONS[2];
  const materials = MOCK_MATERIALS.filter(m => m.formulaVersionId === activeVersion.id);
  const specs = MOCK_SPECS.filter(s => s.formulaVersionId === activeVersion.id);

  return (
    <div className="space-y-8 pb-20">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white">{product.productName}</h2>
              <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary text-[10px] font-black rounded border border-brand-primary/30 uppercase tracking-widest">
                Active: {activeVersion.versionCode}
              </span>
            </div>
            <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
              <span className="text-brand-primary font-mono font-bold">{product.productCode}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              {product.tileType} • {product.size}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Lịch sử Version
          </button>
          <button className="btn-primary">
            <Edit3 className="w-4 h-4" />
            Chỉnh sửa Phối
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-base p-6 border-l-4 border-l-brand-primary">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Layers size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Loại Phối</span>
          </div>
          <p className="text-lg font-black text-white">{activeVersion.formulaType} Porcelain</p>
          <p className="text-xs text-slate-500 mt-1">Ngày áp dụng: {formatDate(activeVersion.effectiveDate)}</p>
        </div>
        <div className="card-base p-6 border-l-4 border-l-green-500">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Trạng thái Kỹ thuật</span>
          </div>
          <p className="text-lg font-black text-white">Đã phê duyệt</p>
          <p className="text-xs text-green-500/80 mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} />
            Đáp ứng tiêu chuẩn ISO-9001
          </p>
        </div>
        <div className="card-base p-6 border-l-4 border-l-brand-accent">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Beaker size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Người phụ trách</span>
          </div>
          <p className="text-lg font-black text-white">PT. Kỹ Thuật A</p>
          <p className="text-xs text-slate-500 mt-1 italic">Hỗ trợ bởi AI GốmCore</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Materials Table */}
        <div className="lg:col-span-2 card-base flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <FileText className="text-brand-primary" size={20} />
               <h3 className="font-black text-white text-lg">Bảng Phối liệu Chi tiết</h3>
             </div>
             <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400">
               TỔNG TỶ LỆ: 100.0%
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-slate-500 font-black uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Nguyên liệu</th>
                  <th className="px-6 py-4 text-center">Tỷ lệ (%)</th>
                  <th className="px-6 py-4 text-center">Độ ẩm (%)</th>
                  <th className="px-6 py-4 text-center">Quy khô (kg)</th>
                  <th className="px-6 py-4 text-center">Cân thực tế (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {materials.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-black text-white">{m.materialName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{m.materialCode}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-brand-primary">
                      {m.ratioPercent.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-center text-slate-400">
                      {m.moisture.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-white">
                      {m.dryQuantity}
                    </td>
                    <td className="px-6 py-4 text-center font-black text-brand-accent">
                      {m.wetQuantity.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Specs & Notes */}
        <div className="space-y-8">
          {/* Specs Card */}
          <div className="card-base p-6">
            <div className="flex items-center gap-3 mb-6">
               <Zap className="text-brand-accent" size={20} />
               <h3 className="font-black text-white text-lg">Thông số Kỹ thuật</h3>
            </div>
            <div className="space-y-4">
              {specs.map(spec => (
                <div key={spec.id} className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-primary/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{spec.specType}</p>
                    <span className="text-[10px] text-brand-primary font-bold">{spec.unit}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">{spec.minValue}</span>
                    <span className="text-slate-600 mb-1 font-bold">-</span>
                    <span className="text-2xl font-black text-white">{spec.maxValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Warnings */}
          <div className="card-base p-6 bg-orange-500/5 border-orange-500/20">
             <div className="flex items-center gap-3 mb-4 text-orange-400">
                <AlertTriangle size={20} />
                <h3 className="font-black">Lưu ý Sản xuất</h3>
             </div>
             <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {activeVersion.notes || "Kiểm tra độ nhớt hồ sau 30 phút nghiền. Đảm bảo sàng lọc sạch tạp chất cơ học trước khi nạp vào bể chứa."}
             </p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-4 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-brand-primary transition-all font-black text-sm">
             <FileText size={18} />
             XUẤT PHIẾU PHỐI LIỆU (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
