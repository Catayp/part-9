import React from "react";
import { OccupationalHealthCareEntry } from "../types";

const EntryOccupationalHealthcare:  React.FC<{data: OccupationalHealthCareEntry }> = ({data}) => {
  if (data.sickLeave !== undefined) {
    return(
      <>
        <label>employer name: {data.employerName}</label><br/>
        <label>start date sick: {data.sickLeave.startDate}</label><br/>
        <label>end date sick: {data.sickLeave.endDate}</label><br/>
      </>
    );
  }
  return(
      <label>employer name: {data.employerName}</label>      
  );
};
  
  export default EntryOccupationalHealthcare;