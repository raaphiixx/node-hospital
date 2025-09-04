# Simple Hospital CRUD

Simple Node.js + TypeScript CRUD for Doctor and Patient (no authentication needed)
Each Doctor can have many Patients. Each Patient belongs to one Doctor.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech](#tech)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Doctors](#doctors)
- [Patients](#patients)
- [Validation (Zod)](#validation-zod)
- [Doctor](#doctor)
- [Patient](#patient)

## Project Overview
This is a small **REST API** built with Node.js + TypeScript that implemnts basic CRUD operations for two entites:
- Doctor
- Patient

No authentication was implemented (this was intentional / simplified for learning). The project uses Prisma as ORM and MySQL as the database (containerized with Docker during development).

## Tech
- Node.js + Typescript
- Prisma(ORM)
- MySQL (Database)
- Docker / docker compose
- nodemon
- dotenv
- zod
- git

## Getting Started
1. Clone the repo
```
git clone https://github.com/raaphiixx/node-hospital
```
2. Open the project directory and run
```
npm install
```
3. Create ```.env``` file, and config (this configuration is following docker compose file)
```
MYSQL_USER=root
MYSQL_PASS=ChangeMe123!
MYSQL_DB=hospitaldb
MYSQL_PORT=3306
MYSQL_HOST=localhost
DATABASE_URL="mysql://root:ChangeMe123!@localhost:3306/hospitaldb"
```
4. Navigate to docker directory and run the DB
```
docker compose up -d
```
5. Prisma setup on root of project directory
```
npx prisma migrate dev --name init
```
```
npx prisma generate
```
6. Run the application
```
npm run dev
```

## API Endpoints
Base URL: http://localhost:8080

### Doctors
- ``GET /doctors`` - List all doctors
```
http://localhost:8080/doctors
```
- ``GET /doctors/id`` - Return an especific doctor
```
http://localhost:8080/doctors/{id}
```
- ``PATH /doctors/update/id`` - Update some information of a doctor
```
http://localhost:8080/doctors/update/{id}
```
**Body JSON:**
```
{firstName: "example"}
```
- ``DELETE /doctors/delete/id`` - Delete a doctor
```
http://localhost:8080/doctors/delete/{id}
```

### Patients
- ``GET /patients`` - List all patients
```
http://localhost:8080/patients
```
- ``GET /patients/id`` - Return an especific patients
```
http://localhost:8080/patients/{id}
```
- ``PATH /patients/update/id`` - Update some information of a patients
```
http://localhost:8080/patients/update/{id}
```
**Body JSON:**
```
{firstName: "example"}
```
- ``DELETE /patients/delete/id`` - Delete a patients
```
http://localhost:8080/patients/delete/{id}
```

## Validation (Zod)
Example patterns:

### Doctor
1. It is mandatory firstName and lastName to has minimum 3 characters.
2. Using enum to choose gender, two options to make easy.
3. practionerId needs to be positive, but in this case minimum option was not used.
4. partial() function was used to update Doctors, without all information.
```
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
```

### Patient
1. It is mandatory firstName and lastName to has minimum 3 characters.
2. birthData follow some rules, needs to be an integer number ,min date is 1900, max the current year.
3. Patient has a foreigner key called doctorId to link patient to a doctor.
```
import { email, z } from 'zod';

export const createPatientSchema = z.object({
firstName: z.string().min(3),
lastName: z.string().min(3),
gender: z.enum(['male', 'female']),
birthDate: z.number()
.int()
.min(1900)
.max(new Date().getFullYear()),
email: z.email(),
doctorId: z.number().int().positive(),
});

export const updatePatientSchema = createPatientSchema.partial();

export type updatePatientDTO = z.infer<typeof createPatientSchema>;
export type CreatePatientDTO = z.infer<typeof createPatientSchema>;

```
