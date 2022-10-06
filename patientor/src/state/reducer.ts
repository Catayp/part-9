import { State } from "./state";
import { Patient, DiagnoseEntry } from "../types";

export type Action =
| {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
| {
    type: "ADD_PATIENT";
    payload: Patient;
  }
|  {
    type: "GET_ID";
    payload: Patient;
  }
| {
    type: "SET_DIAGNOSES_LIST";
    payload: DiagnoseEntry[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_ID":
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (data1, diagnoses)=>({ ...data1, [diagnoses.code]: diagnoses}),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  };
};
export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload
  };
};
export const getId = (payload: Patient): Action => {
  return {
    type: "GET_ID",
    payload
  };
};
export const setDiagnosesList = (payload: DiagnoseEntry[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload
  };
};