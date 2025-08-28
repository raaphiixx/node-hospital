import { email, z } from 'zod';

export const createPatientSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(['MALE', 'FEMALE']),
    birthDate: z.number()
    .int()
    .min(1900)
    .max(new Date().getFullYear()),
    email: z.email(),
    doctorId: z.number().int().positive(),    
})

export type CreatePatientSchema = z.infer<typeof createPatientSchema>;
