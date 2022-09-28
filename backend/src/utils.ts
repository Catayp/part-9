/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  Gender,
  patientsAdd,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  HospitalEntry,
  Entry,
  HealthCheckRating,
  BaseEntry,
  Discharge,
  SickLeave,
  DiagnoseEntry
} from "./types";

const toNewPatientEntry = (object: any): patientsAdd => {
  return {
    name: parseParam(object.name),
    dateOfBirth: parseParam(object.dateOfBirth),
    ssn:parseParam(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseParam(object.occupation),
    entries: []
  };
};
const newEntry = (object: any): Entry => {
  if(isHealthCheck(object)){
    return parseHealthCheck(object);
  } else if (isOccupationalHealthcare(object)) {
    return parseOccupationalHealthcare(object);
  } else if (isHospital(object)) {
    return parseHospital(object);
  } else throw new Error("incorrect or missing entries");
};

// parsear tipos de datos
export const parseParam = (param: any): string => {
  if (!param || !isString(param)) throw new Error('incorrect or missing date');
  return param;
};
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("incorrect or missing gender");
  }
  return gender;
};
const parseBaseEntry = (object: any): BaseEntry => {
  return {
    id: parseParam(object.id),
    date: parseParam(object.date),
    description: parseParam(object.description),
    specialist: parseParam(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
};
const parseHealthCheck = (object: any): HealthCheckEntry => {
  const BaseEntry = parseBaseEntry(object);
  return {
    ...BaseEntry,
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };
};
const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (param === undefined || !isHealthCheckRating(param)) {
    throw new Error("incorrect or missing rating");
  }
  return param;
};
const parseOccupationalHealthcare = (object: any): OccupationalHealthCareEntry => {
  const BaseEntry = parseBaseEntry(object);
  return {
    ...BaseEntry,
    type: "OccupationalHealthcare",
    employerName: parseParam(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };
};
const parseHospital = (object: any): HospitalEntry => {
  const BaseEntry = parseBaseEntry(object);
  return {
    ...BaseEntry,
    type: "Hospital",
    discharge: parseHospitaldischarge(object.discharge)
  };
};
const parseHospitaldischarge = (object: any): Discharge => {
  return {
    date: parseParam(object.date),
    criteria: parseParam(object.criteria)
  };
};
const parseSickLeave = (object: any): SickLeave | undefined => {
  if (!object) {
    return undefined;
  }
  return {
    startDate: parseParam(object.startDate),
    endDate: parseParam(object.endDate)
  };
};
const parseDiagnosisCodes = (object: any): Array<DiagnoseEntry['code']> | undefined => {
  if (!object) {
    return undefined;
  }
  if (!isDiagnose(object)) {
    throw new Error("incorrect or missing diagnose");
  }
  return object;
};

// comprobar tipos de datos
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const isHealthCheck = (param: any): param is HealthCheckEntry => {
  return param.type === "HealthCheck";
};
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const isOccupationalHealthcare = (param: any): param is OccupationalHealthCareEntry => {
  return param.type === "OccupationalHealthcare";
};
const isHospital = (param: any): param is HospitalEntry => {
  return param.type === "Hospital";
};
const isDiagnose = (param: any): param is Array<DiagnoseEntry['code']> => {
  let isStringDiagnose: Array<boolean>;
  if (Array.isArray(param)) {
    isStringDiagnose = param.map(dat => {
      if (typeof(dat) !== 'string'){
        return false;
      }
      return true;
    });
  }
  else
    isStringDiagnose=[false];
  return !isStringDiagnose.includes(false);
};

export default {toNewPatientEntry, newEntry};