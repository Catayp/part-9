"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParam = void 0;
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    return {
        name: (0, exports.parseParam)(object.name),
        dateOfBirth: (0, exports.parseParam)(object.dateOfBirth),
        ssn: (0, exports.parseParam)(object.ssn),
        gender: parseGender(object.gender),
        occupation: (0, exports.parseParam)(object.occupation),
        entries: []
    };
};
const newEntry = (object) => {
    if (isHealthCheck(object)) {
        return parseHealthCheck(object);
    }
    else if (isOccupationalHealthcare(object)) {
        return parseOccupationalHealthcare(object);
    }
    else if (isHospital(object)) {
        return parseHospital(object);
    }
    else
        throw new Error("incorrect or missing entries");
};
// parsear tipos de datos
const parseParam = (param) => {
    if (!param || !isString(param))
        throw new Error('incorrect or missing date');
    return param;
};
exports.parseParam = parseParam;
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("incorrect or missing gender");
    }
    return gender;
};
const parseBaseEntry = (object) => {
    return {
        id: (0, exports.parseParam)(object.id),
        date: (0, exports.parseParam)(object.date),
        description: (0, exports.parseParam)(object.description),
        specialist: (0, exports.parseParam)(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
};
const parseHealthCheck = (object) => {
    const BaseEntry = parseBaseEntry(object);
    return Object.assign(Object.assign({}, BaseEntry), { type: "HealthCheck", healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
};
const parseHealthCheckRating = (param) => {
    if (param === undefined || !isHealthCheckRating(param)) {
        throw new Error("incorrect or missing rating");
    }
    return param;
};
const parseOccupationalHealthcare = (object) => {
    const BaseEntry = parseBaseEntry(object);
    return Object.assign(Object.assign({}, BaseEntry), { type: "OccupationalHealthcare", employerName: (0, exports.parseParam)(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
};
const parseHospital = (object) => {
    const BaseEntry = parseBaseEntry(object);
    return Object.assign(Object.assign({}, BaseEntry), { type: "Hospital", discharge: parseHospitaldischarge(object.discharge) });
};
const parseHospitaldischarge = (object) => {
    return {
        date: (0, exports.parseParam)(object.date),
        criteria: (0, exports.parseParam)(object.criteria)
    };
};
const parseSickLeave = (object) => {
    if (!object) {
        return undefined;
    }
    return {
        startDate: (0, exports.parseParam)(object.startDate),
        endDate: (0, exports.parseParam)(object.endDate)
    };
};
const parseDiagnosisCodes = (object) => {
    if (!object) {
        return undefined;
    }
    if (!isDiagnose(object)) {
        throw new Error("incorrect or missing diagnose");
    }
    return object;
};
// comprobar tipos de datos
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isHealthCheck = (param) => {
    return param.type === "HealthCheck";
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const isOccupationalHealthcare = (param) => {
    return param.type === "OccupationalHealthcare";
};
const isHospital = (param) => {
    return param.type === "Hospital";
};
const isDiagnose = (param) => {
    let isStringDiagnose;
    if (Array.isArray(param)) {
        isStringDiagnose = param.map(dat => {
            if (typeof (dat) !== 'string') {
                return false;
            }
            return true;
        });
    }
    else
        isStringDiagnose = [false];
    return !isStringDiagnose.includes(false);
};
exports.default = { toNewPatientEntry, newEntry };
