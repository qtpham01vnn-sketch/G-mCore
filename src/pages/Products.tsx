import React from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  MoreVertical,
  Activity,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: typeof MOCK_PRODUCTS[0];
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => (
  <div 
    onClick={onClick}
    className="card-base group cursor-pointer hover:border-brand-primary transition-all duration-300"
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 text-brand-primary rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
          <Package className="w-6 h-6" />
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
          product.status === 'active' ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"
        )}>
          {product.status === 'active' ? 'Đang sản xuất' : 'Tạm dừng'}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-black text-lg text-white truncate">{product.productName}</h3>
        <p className="text-brand-primary font-mono font-bold text-sm tracking-tight">{product.productCode}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {['TileType', 'Size', 'SurfaceType'].map(key => (
          <span key={key} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-300 border border-white/5">
            {(product as any)[key.charAt(0).toLowerCase() + key.slice(1)]}
          </span>
        ))}
      </div>
    </div>

    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1,2].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
              {i === 1 ? 'A' : 'T'}
            </div>
          ))}
        </div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bản phối: V3-Active</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
    </div>
  </div>
);

export default function Products({ onSelectProduct }: { onSelectProduct: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.productCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Danh mục Sản phẩm</h2>
          <p className="text-slate-400 font-medium">Quản lý gạch Ceramic, Granite và Xương/Men tương ứng</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 rounded-lg hover:bg-white/10 text-sm font-bold text-white transition-colors">
            <Filter className="w-4 h-4" />
            Lọc nâng cao
          </button>
          <button className="btn-primary">
            <Plus className="w-5 h-5" />
            Sản phẩm mới
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-8 overflow-x-auto pb-px">
        {['Tất cả', 'Porcelain', 'Granite', 'Ceramic', 'Tạm lưu'].map((tab, idx) => (
          <button 
            key={tab}
            className={cn(
              "px-1 py-4 text-sm font-black transition-all relative",
              idx === 0 ? "text-brand-primary" : "text-slate-500 hover:text-white"
            )}
          >
            {tab}
            {idx === 0 && (
              <motion.div 
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Search Bar Inline */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Tìm theo tên hoặc mã sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all placeholder:text-slate-500"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />
        ))}
        
        {/* Placeholder for "Add New" */}
        <div className="card-base border-dashed border-2 flex flex-col items-center justify-center p-8 gap-4 group hover:bg-white/5 hover:border-brand-primary transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/10">
            <Plus className="w-6 h-6 text-slate-500 group-hover:text-brand-primary" />
          </div>
          <div className="text-center">
            <p className="font-black text-slate-400 group-hover:text-white">Thêm sản phẩm mới</p>
            <p className="text-xs text-slate-500">Định nghĩa mã và kích thước</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none">100%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Phối liệu đã gán mã</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none">24</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Mẫu thiết kế tháng này</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none">3</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Đang chờ duyệt phối</p>
            </div>
          </div>
      </div>
    </div>
  );
}
