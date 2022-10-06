import React from "react";
import {  HealthCheckRating } from "../types";
import { EntryAdd } from "./AddEntryForm";
import { Field } from "formik";
import { HealthCheckRatingOption, SelectField, TextField } from "./FormEntryField";

const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
  {label: "Healthy", value: HealthCheckRating.Healthy},
  {label: "LowRisk", value: HealthCheckRating.LowRisk},
  {label: "HighRisk", value: HealthCheckRating.HighRisk},
  {label: "CriticalRisk", value: HealthCheckRating.CriticalRisk}
];
const AddEntryType: React.FC<{entries: EntryAdd['type']}> = ({entries}) => {
  switch (entries) {
    case "HealthCheck":
      return (
        <>
          <SelectField
            label="health ratink"
            name="healthCheckRating"
            options={HealthCheckRatingOptions}
          />
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="employer Name"
            placeholder="Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="start date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="end date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    case "Hospital":
      return (
        <>
          <Field
            label="date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="criteria"
            placeholder="criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    default:
    return (<div></div>);
  }
};

export default AddEntryType;