import React from "react";
import { HealthCheckEntry } from "../types";

const EntryHealthCheck: React.FC<{data: HealthCheckEntry }> = ({data}) => (
    <label>health Check Rating: {data.healthCheckRating}</label>
  );
  
export default EntryHealthCheck;