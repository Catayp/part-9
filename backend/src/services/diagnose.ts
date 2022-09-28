import diagnosesData from '../../data/diagnosesData';
import { DiagnoseEntry} from '../types';

const getDiagnoses = (): Array<DiagnoseEntry> => diagnosesData;
const addDiagnoses = () => null;


export default { getDiagnoses, addDiagnoses };