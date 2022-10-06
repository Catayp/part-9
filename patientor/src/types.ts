export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export interface BaseEntry {
  id: string,
  date: string,
  description: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnoseEntry['code']>
}
export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface SickLeave {
  startDate: string,
  endDate: string
}
interface Discharge {
  date: string,
  criteria: string
}
export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthCareEntry  extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}
export interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}
export interface NoEntry extends BaseEntry {
  type: 'SelectEntry'
}
export type Entry = 
| HealthCheckEntry
| OccupationalHealthCareEntry
| HospitalEntry
| NoEntry;