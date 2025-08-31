import { prisma } from "../../database/prisma";
import type { Patient } from "@prisma/client";
import type { CreatePatientDTO } from "../schemas/patient.schema";

export function listAllPatients(): Promise<Patient[]> {
    return prisma.patient.findMany();
}

export function findPatientById(id: number): Promise<Patient | null> {
    return prisma.patient.findUnique({
        where: { id }
    });
}

export function createPatient(
    data: CreatePatientDTO
): Promise<Patient> {
    return prisma.patient.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            birthYear: data.birthDate,
            email: data.email,
            doctorId: data.doctorId
        }
    })
}
