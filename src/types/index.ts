export type UserRole = 'ADMIN' | 'DOCTOR' | 'LAB_TECH' | 'PATIENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
}

export interface Patient {
  id: string;
  patientNo: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contact?: string;
  address?: string;
  doctorId?: string;
  doctor?: { id: string; name: string };
  createdAt: string;
  _count?: { labResults: number; prescriptions: number };
}

export type TestType = 'CBC' | 'XRAY' | 'STOOL' | 'URINE' | 'URINALYSIS' | 'BLOOD_CHEM' | 'OTHER';

export interface TestRequest {
  id: string;
  testType: TestType;
  instructions?: string;
  prescriptionId: string;
}

export type PrescriptionStatus = 'PENDING' | 'SENT_TO_LAB' | 'COMPLETED';

export interface Prescription {
  id: string;
  prescNo: string;
  qrCode?: string;
  qrToken?: string;
  notes?: string;
  status: PrescriptionStatus;
  patientId: string;
  patient?: Pick<Patient, 'id' | 'name' | 'patientNo'>;
  doctorId: string;
  doctor?: { id: string; name: string };
  testRequests: TestRequest[];
  createdAt: string;
  updatedAt: string;
  _count?: { labResults: number };
}

export interface LabResult {
  id: string;
  resultNo: string;
  testType: TestType;
  resultData: Record<string, string | number>;
  notes?: string;
  qrCode?: string;
  qrToken?: string;
  printedAt?: string;
  patientId: string;
  patient?: Pick<Patient, 'id' | 'name' | 'patientNo'>;
  labTechId: string;
  labTech?: { id: string; name: string };
  prescriptionId?: string;
  prescription?: Prescription;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  stats: {
    totalPatients: number;
    totalResults: number;
    totalPrescriptions: number;
    pendingPrescriptions: number;
  };
  recentResults: LabResult[];
  recentPrescriptions: Prescription[];
}

export interface QRScanResult {
  type: 'LAB_RESULT' | 'PRESCRIPTION';
  data: LabResult | Prescription;
}

export interface AuthResponse {
  user: User;
  token: string;
}
