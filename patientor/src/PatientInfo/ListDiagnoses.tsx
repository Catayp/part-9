import React, { useEffect } from "react";
import axios from 'axios';
import { useStateValue, setDiagnosesList } from '../state';
import { DiagnoseEntry } from "../types";
import { apiBaseUrl } from '../constants';

const ListDiagnosesEntry: React.FC<{ diagnosesPatient: Array<DiagnoseEntry['code']> | undefined }> = ({ diagnosesPatient }) => {
  const [{diagnoses}, dispatch] = useStateValue();

  useEffect(() => {
    const getDiagnoses = async() => {
      const {data: list} = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
      dispatch(setDiagnosesList(list));
    };
    void getDiagnoses();
  }, [dispatch]);
  if (diagnosesPatient !== undefined) {
    let n = 0;
    return (
      <div>
        <label>diagnoses: </label>
        <ul>
          {diagnosesPatient.map(element => {
            const k = Object.values(diagnoses).find((data: DiagnoseEntry) =>data.code == element);
            if(k) return(<li key={n++}>{element}-{k.name}</li>);
            else  return(<li key={n++}>{element}</li>);
          })}
        </ul>
      </div>
    );
  }
  return(<div></div>);
};

export default ListDiagnosesEntry;