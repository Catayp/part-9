import PatientsData from "../../data/patientsData";
import { Patient, PublicPatient, patientsAdd, PatientsPrivate, Entry } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { parseParam } from "../utils";

const getPatients = (): Array<Patient> => PatientsData;
const getPatientsPrivate = (): PublicPatient[] => {
  return PatientsData.map(
    ({id, name, dateOfBirth, gender ,occupation}) => ({
      id, 
      name, 
      dateOfBirth, 
      gender, 
      occupation
    })
  );
};
const getPatient = (id: string): PatientsPrivate => {
  const data = PatientsData.find(data =>data.id === id);
  if (data) return data; 
  throw new Error("error, patient not fount");
};
const addPatients = ( entry: patientsAdd): Patient => {
  // console.log('entro');
  const newPatient = { id: parseParam(uuidv4()), ...entry };
  PatientsData.push(newPatient);
  return newPatient;
};

const addEntryPatients = (id: string, entry: Entry): PublicPatient => {
  console.log('entry');
  const patientId = getPatient(id);
  patientId.entries.push(entry);
  console.log(patientId);
  return patientId;
};

export default { getPatients, getPatientsPrivate, addPatients, getPatient, addEntryPatients };