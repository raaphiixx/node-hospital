import { Router } from "express";
import { validate } from "../../utils/validate";
import { createPatientSchema, CreatePatientDTO } from "../schemas/patient.schema";
import * as patientModel from '../models/patient.model';

const router = Router();

router.get('/', async(req, res) => {
    try {
        const patients = await patientModel.listAllPatients();
        return res.status(200).json(patients);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(400);
    };
});

router.post('/register', validate(createPatientSchema), async(req, res) => {
    try {
        const data = req.body as CreatePatientDTO;
        const patient = await patientModel.createPatient(data);
        return res.status(201).json(patient);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500);
    };
});
export default router;
