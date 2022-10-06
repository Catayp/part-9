import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form /*useFormikContext**/ } from "formik";
import { TextField, AddHealthCheck, AddOccupationalHealthCare, AddHospital, AddNoEntry } from "./FormEntryField"; 
import AddEntryType from "./AddEntryType";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

export type EntryAdd = AddHealthCheck|AddOccupationalHealthCare|AddHospital|AddNoEntry;

interface Props {
  onSubmit: (values: EntryAdd) => void;
  onCancel: () => void;
  initialValues: EntryAdd;
}

export const AddEntryForm = ({ onSubmit, onCancel, initialValues }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      enableReinitialize
      initialValues={{...initialValues}}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (values.type === "SelectEntry") {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {/* <Field
              label="diagnosisCodes"
              placeholder="XXX, XXX, XXXX"
              name="diagnosisCodes"
              component={TextField}
            /> */}
            <AddEntryType 
              entries={values.type}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
