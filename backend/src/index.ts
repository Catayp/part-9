import express from 'express';
import cors from 'cors';
import routerDiagnoses from './routes/diagnoses';
import routerPatients from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use("/api", routerDiagnoses);
app.use("/api/patients", routerPatients);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});