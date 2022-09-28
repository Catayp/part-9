import express from "express";
import patient from "../services/patient";
import utils from "../utils";
import { v4 as uuidv4 } from 'uuid';
import { parseParam } from "../utils";

const routerPatients = express.Router();

routerPatients.get('/todo', (_req, res) => {
    res.send(patient.getPatients());
});

routerPatients.get('/', (_req, res) => {
    console.log('patients');
    res.send(patient.getPatientsPrivate());
});

routerPatients.post('/', (req, res) => {
    try {
        console.log(req.body);
        const newEntry = utils.toNewPatientEntry(req.body);
        // console.log('p');
        const newPatient = patient.addPatients(newEntry);
        res.json(newPatient);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e});
    }
});
routerPatients.get('/:id', (req, res)=>{
    const patientId = req.params.id;
    console.log(patientId);
    res.json(patient.getPatient(patientId));
});
routerPatients.post('/:id/entries',(req, res) => {
    const patientId = req.params.id;
    // console.log(patientId);
    const data = { id: parseParam(uuidv4())} ;
    // console.log(req.body);
    const entry = utils.newEntry({...data, ...req.body});
    res.json(patient.addEntryPatients(patientId, entry));
});

export default routerPatients;