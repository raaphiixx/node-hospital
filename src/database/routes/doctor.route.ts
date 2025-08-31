import { Router } from "express";
import { validate } from "../../utils/validate";
import { createDoctorSchema, CreateDoctorDTO } from "../schemas/doctor.schema";
import * as doctorModel from '../models/doctor.model';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const doctors = await doctorModel.listAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const doctor = await doctorModel.findDoctorById(id);
        if(doctor === null) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json(doctor);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500);
    }
})

router.post('/register',validate(createDoctorSchema) ,async (req, res) => {
    try {
        const data = req.body as CreateDoctorDTO;
        const doctor = await doctorModel.createDoctor(data)
        res.status(201).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(400);
    }
});

export default router;
