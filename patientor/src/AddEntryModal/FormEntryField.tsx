import React/*, { useState }**/ from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import {
  Select,
  MenuItem,
  TextField as TextFieldMUI,
  Typography
} from "@material-ui/core";
import { HealthCheckRating, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry, NoEntry, BaseEntry } from "../types";
import { InputLabel } from "@material-ui/core";
import AddEntryForm, { EntryAdd } from "./AddEntryForm";

export type AddHealthCheck = Omit<HealthCheckEntry, 'id'>;
export type AddOccupationalHealthCare = Omit<OccupationalHealthCareEntry, 'id'>;
export type AddHospital = Omit<HospitalEntry, 'id'>;
export type AddNoEntry = Omit<NoEntry, 'id'>;
export type EntryInitial = Omit<BaseEntry, 'id'>;

export type EntryOption = {
  value: string|number;
  label: string;
};
export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};
type SelectFieldProps = {
  name: string;
  label: string;
  options:  EntryOption[];
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}
interface TypeOptions {
  typeEntry: EntryAdd['type'],
  setTypeEntry: React.Dispatch<React.SetStateAction<EntryAdd['type']>>
}
interface FormEntries {
  typeEntry: EntryAdd['type'],
  onSubmit: (values: EntryAdd) => void;
  onCancel: () => void;
}

export const entriesOptions: EntryOption[] = [
  {label:"SelectEntry", value:"SelectEntry"},
  {label:"HealthCheck", value:"HealthCheck"},
  {label:"OccupationalHealthcare", value:"OccupationalHealthcare"},
  {label:"Hospital", value:"Hospital"}
];

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);
export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);
export const SelectType = ({typeEntry, setTypeEntry}: TypeOptions) => (
  <>
    <InputLabel>SelectEntry</InputLabel>
    <Select 
      style={{marginBottom: "0.5em"}} 
      fullWidth
      defaultValue={typeEntry}
      value={typeEntry} 
      onChange={ (event) => setTypeEntry(event.target.value as EntryAdd['type']) }
      name={typeEntry}
    >
      {entriesOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Select>
  </>
);

export const FormEntry = ({typeEntry, onSubmit, onCancel}: FormEntries) => {
    const baseInitialValues: EntryInitial = {
      description:  "",
      specialist: "",
      date: "",
      diagnosisCodes: undefined
    }; 

    switch (typeEntry) {
      case "HealthCheck":
        const initialValues: AddHealthCheck = {
          ...baseInitialValues,
          type: "HealthCheck",
          healthCheckRating: 0
        };
        return(
          <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} initialValues={initialValues}/>
        );
      case "OccupationalHealthcare":
        const valuesOccupationalHealthcare: AddOccupationalHealthCare = {
          ...baseInitialValues,
          type: "OccupationalHealthcare",
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: ""
          }
        };
        return(
          <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} initialValues={valuesOccupationalHealthcare} />
        );
      case "Hospital":
        const valuesHospital: AddHospital = {
          ...baseInitialValues,
          type: "Hospital",
          discharge: {
            date: "",
            criteria: ""
          }
        };
        return(
          <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} initialValues={valuesHospital} />
        );
      case "SelectEntry":
        return(<div>SelectEntry</div>);
      default:
        return(<div></div>);
    }
};