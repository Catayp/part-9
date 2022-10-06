import React from "react";
import { HospitalEntry } from "../types";

const EntryHospital:  React.FC<{data: HospitalEntry }> = ({data}) => (
  <>
  <label>Hospital date: {data.discharge.date}</label><br/>
  <label>criteria: {data.discharge.criteria}</label><br/>
  </>
  );
  
  export default EntryHospital;