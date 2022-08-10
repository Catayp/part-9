import express from 'express';
import {calculatorBmi} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get(`/welcome`, (_req, res) => {
  res.send('hellow Full Stack');
});

app.get(`/bmi`, (req, res) => {
  const masa = Number(req.query.masa);
  const altura = Number(req.query.altura);
  try {
    const calculator = calculatorBmi(masa, altura);
    res.send(calculator);
  } catch (error: unknown) {
      if (typeof error === "string") {
          error.toUpperCase(); // works, `e` narrowed to string
      } else if (error instanceof Error) {
          error.message; // works, `e` narrowed to Error
          res.send({error: error.message});
      }
  }
});

app.post("/exercises", (req, res) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: any = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response: object| string = calculateExercises(daily_exercises, Number(target));

    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
      return res.json({error: response});
    }
    return res.json(response);
});

const PORT = '3003';

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});