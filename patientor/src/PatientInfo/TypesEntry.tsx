import React from "react";
import { Entry } from "../types";
import EntryHospital from "./EntryHospital";
import EntryHealthCheck from "./EntryHealthCheck";
import EntryOccupationalHealthcare from "./EntryOccupationalHealthcare";

const TypesEntry: React.FC<{entry: Entry}> = ({entry})=>{
  switch (entry.type) {
    case "HealthCheck":
      return(
        <div>
          <h2>HealthCheck</h2>
          <EntryHealthCheck data={entry} />
        </div>
      );
    case "OccupationalHealthcare":
      return(
        <div>
          <h2>OccupationalHealthcare</h2>   
          <EntryOccupationalHealthcare data={entry} />
        </div>
      );
    case "Hospital":
      return(
        <div>
          <h2>Hospital</h2>
          <EntryHospital data={entry} /> 
        </div>
      );
    default:
      return(
        <div></div>
      );
  }
};

export default TypesEntry;