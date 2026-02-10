export enum Role {
  MENTOR = 'MENTOR',
  TELECALLER = 'TELECALLER',
  INTERN = 'INTERN',
  EMPLOYEE = 'EMPLOYEE'
}

export enum Department {
  HR = 'HR',
  DATA_ANALYST = 'DATA_ANALYST',
  DIGITAL_MARKETING = 'DIGITAL_MARKETING',
  WEB_DEVELOPER = 'WEB_DEVELOPER',
  TELECALLER = 'TELECALLER',
  NONE = 'NONE' // For generic Employee if not specified
}

export interface User {
  id: string; // Employee ID
  fullName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  phone: string;
  role: Role;
  department: Department;
  createdAt?: string; // ISO String
}

export interface StoredFile {
  name: string;
  type: string;
  content: string; // Base64 Data URL
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToDepartment?: Department;
  assignedToRole?: Role;
  assignedToUserId?: string;
  date: string; // YYYY-MM-DD
  deadline: string; // ISO string
  attachments?: (string | StoredFile)[]; // Support both legacy strings and new StoredFile objects
}

export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  content: string; // Text answer or call count
  fileUrl?: string; // Legacy: Comma-separated filenames
  files?: StoredFile[]; // New: Actual file objects
  submittedAt: string; // ISO string
  status: 'SUBMITTED' | 'LATE';
}

export interface Attendance {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  clockInTime: string; // ISO string
  status: 'PRESENT' | 'LATE' | 'ABSENT';
}

export interface ClassSession {
  id: string;
  date: string; // YYYY-MM-DD
  topic: string;
  description: string;
  attachments: (string | StoredFile)[]; // Support both legacy strings and new StoredFile objects
  uploadedBy: string; // Mentor ID
  uploadedAt: string; // ISO string
  department: Department;
}

export const DEPARTMENTS = [
  { value: Department.HR, label: 'Human Resources' },
  { value: Department.DATA_ANALYST, label: 'Data Analyst' },
  { value: Department.DIGITAL_MARKETING, label: 'Digital Marketing' },
  { value: Department.WEB_DEVELOPER, label: 'Web Developer' },
  { value: Department.TELECALLER, label: 'Telecaller' },
];

export const ROLES = [
  { value: Role.INTERN, label: 'Internship Student' },
  { value: Role.EMPLOYEE, label: 'Full-time Employee' },
  { value: Role.TELECALLER, label: 'Telecaller' },
];