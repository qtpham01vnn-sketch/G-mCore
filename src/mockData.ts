import { Factory, Product, FormulaVersion, FormulaMaterial, TechnicalSpec, ActivityLog, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', fullName: 'Nguyễn Văn A', username: 'admin_a', role: 'admin', isActive: true },
  { id: 'u2', fullName: 'Trần Thị B', username: 'tech_b', role: 'user', isActive: true },
];

export const MOCK_FACTORIES: Factory[] = [
  { id: 'f1', name: 'Nhà máy Ceramic Bình Dương', code: 'NM01', address: 'KCN Sóng Thần, Bình Dương', status: 'active' },
  { id: 'f2', name: 'Nhà máy Gạch Đồng Nai', code: 'NM02', address: 'KCN Biên Hòa, Đồng Nai', status: 'active' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', productCode: 'PN25C', productName: 'Gạch Porcelain 500x500 Trắng', tileType: 'Porcelain', size: '500x500', surfaceType: 'Bóng', status: 'active', currentFormulaVersionId: 'v3' },
  { id: 'p2', productCode: 'MT80G', productName: 'Gạch Matt 800x800 Xám Ngà', tileType: 'Granite', size: '800x800', surfaceType: 'Matt', status: 'active', currentFormulaVersionId: 'v1' },
  { id: 'p3', productCode: 'DG60S', productName: 'Gạch Sân Vườn 600x600', tileType: 'Ceramic', size: '600x600', surfaceType: 'Nhám', status: 'active', currentFormulaVersionId: 'v2' },
];

export const MOCK_VERSIONS: FormulaVersion[] = [
  { id: 'v1', productId: 'p1', versionCode: 'V1', formulaTitle: 'Phối liệu Xương V1-2024', formulaType: 'Xương', effectiveDate: '2024-01-15', isCurrent: false, createdBy: 'admin_a', notes: 'Version đầu tiên', status: 'Archived' },
  { id: 'v2', productId: 'p1', versionCode: 'V2', formulaTitle: 'Phối liệu Xương V2-2024', formulaType: 'Xương', effectiveDate: '2024-03-10', isCurrent: false, createdBy: 'admin_a', notes: 'Tăng tỷ lệ cao lanh', status: 'Archived' },
  { id: 'v3', productId: 'p1', versionCode: 'V3', formulaTitle: 'Phối liệu Xương V3-Chuẩn', formulaType: 'Xương', effectiveDate: '2024-05-01', isCurrent: true, createdBy: 'admin_a', notes: 'Version chuẩn áp dụng hiện tại', status: 'Active' },
];

export const MOCK_MATERIALS: FormulaMaterial[] = [
  { id: 'm1', formulaVersionId: 'v3', materialName: 'Đất sét PND-VC01', materialCode: 'DS01', ratioPercent: 35.0, moisture: 22.1, dryQuantity: 350, wetQuantity: 449.2, waterAmount: 99.2 },
  { id: 'm2', formulaVersionId: 'v3', materialName: 'Cao lanh K12', materialCode: 'CL12', ratioPercent: 15.0, moisture: 18.2, dryQuantity: 150, wetQuantity: 183.3, waterAmount: 33.3 },
  { id: 'm3', formulaVersionId: 'v3', materialName: 'Tràng thạch nội', materialCode: 'TT01', ratioPercent: 40.0, moisture: 2.5, dryQuantity: 400, wetQuantity: 410.2, waterAmount: 10.2 },
  { id: 'm4', formulaVersionId: 'v3', materialName: 'Bột đá vôi', materialCode: 'DV01', ratioPercent: 10.0, moisture: 0.5, dryQuantity: 100, wetQuantity: 100.5, waterAmount: 0.5 },
];

export const MOCK_SPECS: TechnicalSpec[] = [
  { id: 's1', formulaVersionId: 'v3', specType: 'Tỷ trọng (Density)', minValue: 1.69, maxValue: 1.72, unit: 'g/ml' },
  { id: 's2', formulaVersionId: 'v3', specType: 'Độ nhớt (Viscosity)', minValue: 35, maxValue: 45, unit: 's (Cốc 4)' },
  { id: 's3', formulaVersionId: 'v3', specType: 'Sàng (Residue 250 mesh)', minValue: 0.5, maxValue: 1.2, unit: '%' },
];

export const MOCK_LOGS: ActivityLog[] = [
  { id: 'l1', userId: 'u1', userName: 'Nguyễn Văn A', actionType: 'AI_EXTRACT', entityType: 'FormulaVersion', entityId: 'v3', newValue: 'Trích xuất từ file scan PN25C_Draft.pdf', createdAt: '2024-05-01T08:30:00Z' },
  { id: 'l2', userId: 'u1', userName: 'Nguyễn Văn A', actionType: 'UPDATE', entityType: 'FormulaVersion', entityId: 'v3', oldValue: 'Reviewing', newValue: 'Active', createdAt: '2024-05-01T10:00:00Z' },
];
