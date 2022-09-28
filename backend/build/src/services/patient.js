"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientsData_1 = __importDefault(require("../../data/patientsData"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getPatients = () => patientsData_1.default;
const getPatientsPrivate = () => {
    return patientsData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatient = (id) => {
    const data = patientsData_1.default.find(data => data.id === id);
    if (data)
        return data;
    throw new Error("error, patient not fount");
};
const addPatients = (entry) => {
    // console.log('entro');
    const newPatient = Object.assign({ id: (0, utils_1.parseParam)((0, uuid_1.v4)()) }, entry);
    patientsData_1.default.push(newPatient);
    return newPatient;
};
const addEntryPatients = (id, entry) => {
    console.log('entry');
    const patientId = getPatient(id);
    patientId.entries.push(entry);
    console.log(patientId);
    return patientId;
};
exports.default = { getPatients, getPatientsPrivate, addPatients, getPatient, addEntryPatients };
