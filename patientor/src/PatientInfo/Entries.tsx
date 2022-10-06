import React from 'react';
import { Entry } from "../types";
import ListDiagnosesEntry from './ListDiagnoses';
import TypesEntry from './TypesEntry';

const Entries: React.FC<{entry: Entry[] | undefined}> = ({entry}) => {  
  if (entry !== undefined && entry.length !== 0) {
    return (
      <div>
        <label>entries: </label>
        {entry.map(obj => 
          <div key={obj.id}>
            <TypesEntry entry={obj} />
            <ul>
              <li>Descripcion: {obj.description} -  </li>
              <li>Date: {obj.date}</li>
              <ListDiagnosesEntry diagnosesPatient={obj.diagnosisCodes} />
            </ul>
          </div>
        )}
      </div>
    );
  }
  return(<div key='0'></div>);
};

export default Entries;