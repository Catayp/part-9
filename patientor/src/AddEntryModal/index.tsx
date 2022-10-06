import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {EntryAdd} from "./AddEntryForm";
import { FormEntry, SelectType } from "./FormEntryField";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryAdd) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [ typeEntry, setTypeEntry ] = React.useState<EntryAdd['type']>("SelectEntry");
  
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
      <SelectType 
        typeEntry={typeEntry}
        setTypeEntry={setTypeEntry}
      />
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <FormEntry typeEntry={typeEntry} onCancel={onClose} onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
