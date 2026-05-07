import React from 'react';
import { 
  Upload, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Loader2, 
  X,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileImage
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type AIStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'review_table';

export default function AIDigitize() {
  const [status, setStatus] = React.useState<AIStatus>('idle');
  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState<File | null>(null);

  const simulateProcessing = () => {
    setStatus('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('processing');
        setTimeout(() => setStatus('success'), 3000);
      }
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      simulateProcessing();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-brand-secondary tracking-tight">Số hóa Phối liệu bằng AI</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Tải lên ảnh chụp, file PDF hoặc Excel bài phối liệu cũ. AI của GốmCore sẽ nhận diện bảng, trích xuất nguyên liệu và thông số kỹ thuật tự động.
        </p>
      </div>

      {/* Main Action Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Upload Column */}
        <div className="space-y-6">
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={cn(
              "card-base border-dashed border-2 p-12 transition-all duration-300 group relative",
              status === 'idle' ? "hover:bg-white/5 hover:border-brand-primary cursor-pointer border-white/10" : "bg-white/5 border-white/10"
            )}
          >
            {status === 'idle' ? (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:scale-110 transition-all duration-300 border border-white/5">
                  <Upload className="w-10 h-10 text-slate-500 group-hover:text-brand-primary" />
                </div>
                <div>
                  <p className="text-xl font-black text-white">Kéo thả file vào đây</p>
                  <p className="text-sm text-slate-500 mt-2">Hỗ trợ PDF, Ảnh (JPG/PNG), Excel</p>
                </div>
                <button 
                   onClick={() => simulateProcessing()}
                   className="btn-primary mt-4"
                >
                  Chọn file từ máy tính
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 text-center">
                <AnimatePresence mode="wait">
                  {status === 'uploading' && (
                    <motion.div 
                      key="upload"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-white">Đang tải file lên...</p>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                          <motion.div 
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'processing' && (
                    <motion.div 
                      key="process"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="w-full space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto text-brand-primary">
                        <Cpu className="w-8 h-8 animate-pulse text-brand-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-white">AI đang phân tích cấu trúc bảng...</p>
                        <p className="text-xs text-slate-500">Nhận diện 42 hàng, 8 cột nguyên liệu</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="card-base p-6 bg-slate-900 border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <h3 className="font-black text-white">Nguyên tắc Bảo mật AI</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toàn bộ dữ liệu phối liệu của bạn được mã hóa và chỉ sử dụng cho mục đích số hóa trong doanh nghiệp. Chúng tôi không chia sẻ bí quyết công thức với bất kỳ bên thứ ba nào.
            </p>
          </div>
        </div>

        {/* Status / Output Column */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card-base divide-y divide-white/10"
              >
                <div className="p-6 bg-green-500/5 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <CheckCircle2 className="w-6 h-6 text-green-400" />
                     <h3 className="font-black text-green-400 uppercase tracking-tighter">Trích xuất Thành công</h3>
                   </div>
                   <button className="text-slate-500 hover:text-red-500" onClick={() => setStatus('idle')}>
                     <X className="w-5 h-5" />
                   </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="p-2 bg-slate-800 rounded-lg shadow-sm border border-white/5">
                      <FileImage className="w-10 h-10 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">File nguồn:</p>
                      <p className="font-black text-white">PN25C_Draft_Scan.pdf</p>
                      <p className="text-[10px] text-slate-500">Kích thước: 1.2 MB • Độ phân giải: High</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-white border-b border-white/5 pb-2">Dữ liệu dự kiến trích xuất:</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Mã phối liệu', val: 'PN25C-V4', conf: '99%' },
                        { label: 'Số lượng nguyên liệu', val: '8 thành phần', conf: '95%' },
                        { label: 'Thông số kỹ thuật', val: '4 thông số (Density...)', conf: '92%' }
                      ].map(item => (
                        <div key={item.label} className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-medium">{item.label}</span>
                          <div className="flex items-center gap-4">
                            <span className="font-black text-white">{item.val}</span>
                            <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-black">AI: {item.conf}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setStatus('review_table')}
                      className="flex-1 btn-primary justify-center font-bold"
                    >
                       Kiểm tra & Chấp nhận
                       <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : status === 'review_table' ? (
              <motion.div
                key="review-table"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-base flex flex-col"
              >
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="font-black text-white text-sm uppercase">Chi tiết Phối liệu AI</h3>
                  <button onClick={() => setStatus('success')} className="text-slate-500 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full text-[11px] text-left">
                    <thead className="bg-slate-900 sticky top-0 text-slate-500 font-black uppercase tracking-widest border-b border-white/5">
                      <tr>
                        <th className="px-4 py-3">Tên NL</th>
                        <th className="px-4 py-3 text-center">%</th>
                        <th className="px-4 py-3 text-center">AI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { m: 'Đất sét PND', r: 32.5, c: 99 },
                        { m: 'Cao lanh K12', r: 15.0, c: 82 },
                        { m: 'Tràng thạch', r: 42.5, c: 98 },
                        { m: 'Bột đá vôi', r: 10.0, c: 99 },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="px-4 py-3 text-white font-bold">{row.m}</td>
                          <td className="px-4 py-3">
                            <input type="number" defaultValue={row.r} className="w-12 bg-transparent border-b border-white/10 text-brand-primary font-black focus:outline-none" />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={cn(
                              "text-[9px] font-black",
                              row.c > 90 ? "text-green-400" : "text-orange-400"
                            )}>
                              {row.c}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-slate-900 border-t border-white/5">
                  <button 
                    onClick={() => {
                      alert("Dữ liệu đã được lưu chính thức!");
                      setStatus('idle');
                    }}
                    className="w-full btn-primary text-xs font-black uppercase tracking-widest py-3"
                  >
                    Xác nhận Lưu Phối
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="card-base p-8 border-dashed flex flex-col items-center justify-center text-center gap-4 opacity-40">
                <div className="p-4 bg-gray-100 rounded-full text-gray-400">
                  <FileText size={40} />
                </div>
                <p className="text-sm font-medium">Bản xem trước AI sẽ xuất hiện tại đây sau khi xử lý</p>
              </div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
             <h4 className="font-bold text-brand-secondary flex items-center gap-2">
               <AlertCircle size={16} className="text-brand-primary" />
               Mẹo để AI đọc tốt nhất:
             </h4>
             <ul className="text-xs text-gray-500 space-y-2 list-disc pl-5">
               <li>Đảm bảo ảnh chụp đủ sáng, không bị mờ nhòe.</li>
               <li>Các đường kẻ bảng trong file scan nên rõ ràng.</li>
               <li>Ngôn ngữ tiếng Việt có dấu được AI GốmCore hỗ trợ 100%.</li>
               <li>Nếu dùng Excel, tránh các ô bị Merge quá phức tạp.</li>
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
