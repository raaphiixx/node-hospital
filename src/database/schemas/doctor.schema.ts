import { z } from 'zod';

export const createDoctorSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(['male', 'female']),
    practitionerId: z.number().int().positive(),
});

export const updateDoctorSchema = createDoctorSchema.partial();

export type UpdateDoctorDTO = z.infer<typeof updateDoctorSchema>;
export type CreateDoctorDTO = z.infer<typeof createDoctorSchema>;
