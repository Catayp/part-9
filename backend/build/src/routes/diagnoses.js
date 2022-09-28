"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnose_1 = __importDefault(require("../services/diagnose"));
const router = express_1.default.Router();
router.get('/diagnoses', (_req, res) => {
    res.send(diagnose_1.default.getDiagnoses());
});
router.get('/ping', (_req, res) => {
    console.log('aqui');
    res.send('pong');
});
exports.default = router;
