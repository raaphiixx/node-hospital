import { prisma } from '../../database/prisma';
import type { Doctor } from '@prisma/client';
import type { CreateDoctorDTO } from '../schemas/doctor.schema';

export function listAllDoctors(): Promise<Doctor[]> {
    return prisma.doctor.findMany();
}

export function findDoctorById(id: number): Promise<Doctor | null> {
    return prisma.doctor.findUnique({
        where: { id }
    });
};

export function createDoctor(
    data: CreateDoctorDTO
): Promise<Doctor> {
    return prisma.doctor.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            practitionerId: data.practitionerId
        }
    });
};

export function deleteDoctor(id: number) : Promise<Doctor | null> {
    return prisma.doctor.delete({
        where: {id}
    });
};

