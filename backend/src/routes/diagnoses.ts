import express from "express";
import diagnose from "../services/diagnose";

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
  res.send(diagnose.getDiagnoses());
});
router.get('/ping', (_req, res) => {
  console.log('aqui');
  res.send('pong');
});
export default router;