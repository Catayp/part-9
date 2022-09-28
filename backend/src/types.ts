export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}
export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}
export type PatientsPrivate = Omit<Patient, 'ssn'>;
export type patientsAdd = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface BaseEntry {
    id: string,
    date: string,
    description: string,
    specialist: string,
    diagnosisCodes?: Array<DiagnoseEntry['code']>
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface SickLeave {
    startDate: string,
    endDate: string
}
export interface Discharge {
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
export type Entry = 
| HealthCheckEntry
| OccupationalHealthCareEntry
| HospitalEntry;

export type EntryAdd = Omit<Entry, 'id'>;
