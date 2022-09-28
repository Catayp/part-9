"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_1 = __importDefault(require("../services/patient"));
const utils_1 = __importDefault(require("../utils"));
const uuid_1 = require("uuid");
const utils_2 = require("../utils");
const routerPatients = express_1.default.Router();
routerPatients.get('/todo', (_req, res) => {
    res.send(patient_1.default.getPatients());
});
routerPatients.get('/', (_req, res) => {
    console.log('patients');
    res.send(patient_1.default.getPatientsPrivate());
});
routerPatients.post('/', (req, res) => {
    try {
        console.log(req.body);
        const newEntry = utils_1.default.toNewPatientEntry(req.body);
        // console.log('p');
        const newPatient = patient_1.default.addPatients(newEntry);
        res.json(newPatient);
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ error: e });
    }
});
routerPatients.get('/:id', (req, res) => {
    const patientId = req.params.id;
    console.log(patientId);
    res.json(patient_1.default.getPatient(patientId));
});
routerPatients.post('/:id/entries', (req, res) => {
    const patientId = req.params.id;
    // console.log(patientId);
    const data = { id: (0, utils_2.parseParam)((0, uuid_1.v4)()) };
    // console.log(req.body);
    const entry = utils_1.default.newEntry(Object.assign(Object.assign({}, data), req.body));
    res.json(patient_1.default.addEntryPatients(patientId, entry));
});
exports.default = routerPatients;
