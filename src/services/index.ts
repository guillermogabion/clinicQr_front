import api from './api';
import type {
  AuthResponse, User, Patient, Prescription, LabResult, DashboardStats, QRScanResult
} from '../types';

// ── AUTH ──────────────────────────────────────────────
export const authService = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }).then(r => r.data),

  register: (data: { email: string; password: string; name: string; role: string }) =>
    api.post<AuthResponse>('/auth/register', data).then(r => r.data),

  me: () => api.get<{ user: User }>('/auth/me').then(r => r.data.user),
};

// ── PATIENTS ──────────────────────────────────────────
export const patientService = {
  getAll: (params?: { search?: string; doctorId?: string }) =>
    api.get<Patient[]>('/patients', { params }).then(r => r.data),

  getOne: (id: string) =>
    api.get<Patient>(`/patients/${id}`).then(r => r.data),

  create: (data: Partial<Patient>) =>
    api.post<Patient>('/patients', data).then(r => r.data),

  update: (id: string, data: Partial<Patient>) =>
    api.put<Patient>(`/patients/${id}`, data).then(r => r.data),

  remove: (id: string) =>
    api.delete(`/patients/${id}`).then(r => r.data),
};

// ── LAB RESULTS ───────────────────────────────────────
export const resultService = {
  getAll: (params?: { patientId?: string; testType?: string; search?: string }) =>
    api.get<LabResult[]>('/results', { params }).then(r => r.data),

  getOne: (id: string) =>
    api.get<LabResult>(`/results/${id}`).then(r => r.data),

  create: (data: {
    patientId: string;
    testType: string;
    resultData: Record<string, string | number>;
    notes?: string;
    prescriptionId?: string;
    testRequestId?: string;
  }) => api.post<LabResult>('/results', data).then(r => r.data),

  markPrinted: (id: string) =>
    api.put<LabResult>(`/results/${id}/print`).then(r => r.data),
};

// ── PRESCRIPTIONS ─────────────────────────────────────
export const prescriptionService = {
  getAll: (params?: { patientId?: string; status?: string }) =>
    api.get<Prescription[]>('/prescriptions', { params }).then(r => r.data),

  getOne: (id: string) =>
    api.get<Prescription>(`/prescriptions/${id}`).then(r => r.data),

  create: (data: {
    patientId: string;
    notes?: string;
    testRequests: { testType: string; instructions?: string }[];
  }) => api.post<Prescription>('/prescriptions', data).then(r => r.data),

  updateStatus: (id: string, status: string) =>
    api.put<Prescription>(`/prescriptions/${id}/status`, { status }).then(r => r.data),
};

// ── QR ────────────────────────────────────────────────
export const qrService = {
  scan: (token: string) =>
    api.get<QRScanResult>(`/qr/scan/${token}`).then(r => r.data),
};

// ── DASHBOARD ─────────────────────────────────────────
export const dashboardService = {
  getStats: () =>
    api.get<DashboardStats>('/dashboard/stats').then(r => r.data),
};
