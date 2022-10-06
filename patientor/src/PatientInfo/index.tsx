import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, getId } from "../state";
import Entries from "./Entries";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryAdd } from "../AddEntryModal/AddEntryForm";

const PatientInfo: React.FC = () => {
  const [{patients}, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{id: string}>();

  React.useEffect(() => {
    const getPatient = async() => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const {data: patientId} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(getId(patientId));
      } catch (error) {
        throw new Error('error');
      }
    };
    getPatient()
      .then(() => console.log('exito'))
      .catch(err => console.log(err));
  }, [dispatch, modalOpen]);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const patientId = Object.values(patients)[0];
  const submitNewEntries = async (values: EntryAdd) => {
    try {
      if(id !== undefined){
        const newEntry = await axios.post<EntryAdd>(`${apiBaseUrl}/patients/${id}/entries`, values);
        console.log(newEntry);
        closeModal();
      }
    } catch (error) {
      console.log(values);
      throw new Error('error');
    }
    
  };
if (patientId.entries) {
  return(
    <div>
      <h1>{patientId.name}</h1>
      <span>{patientId.occupation}</span><br />
      <span>{patientId.gender}</span><br />
      <span>{patientId.dateOfBirth}</span><br />
      <Entries entry={patientId.entries}></Entries>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntries}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}> 
        Add New entries
      </Button>    
    </div>
  );
}
  return(
    <label>loading....</label>
  );
};

export default PatientInfo;