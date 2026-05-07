/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  fullName: string;
  username: string;
  role: 'admin' | 'user';
  factoryId?: string;
  isActive: boolean;
}

export interface Factory {
  id: string;
  name: string;
  code: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Workshop {
  id: string;
  factoryId: string;
  name: string;
  type: 'Xương' | 'Men' | 'Nung';
}

export interface ProductionLine {
  id: string;
  workshopId: string;
  name: string;
  lineType: 'Nghiền' | 'Nung' | 'Tráng men';
}

export interface Product {
  id: string;
  productCode: string;
  productName: string;
  tileType: string;
  size: string;
  surfaceType: string;
  status: 'active' | 'inactive';
  currentFormulaVersionId: string;
}

export interface FormulaVersion {
  id: string;
  productId: string;
  versionCode: string; // V1, V2, etc.
  formulaTitle: string;
  formulaType: 'Xương' | 'Men';
  effectiveDate: string;
  isCurrent: boolean;
  createdBy: string;
  notes: string;
  status: 'Draft' | 'Reviewing' | 'Active' | 'Archived';
}

export interface FormulaMaterial {
  id: string;
  formulaVersionId: string;
  materialName: string;
  materialCode: string;
  ratioPercent: number;
  moisture: number;
  dryQuantity: number;
  wetQuantity: number;
  waterAmount: number;
  notes?: string;
}

export interface TechnicalSpec {
  id: string;
  formulaVersionId: string;
  specType: string; // Density, Viscosity, Residue...
  minValue: number;
  maxValue: number;
  unit: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'AI_EXTRACT';
  entityType: string;
  entityId: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}
