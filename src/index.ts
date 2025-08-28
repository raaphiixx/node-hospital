import express from 'express';
import doctorRoutes from '../src/database/routes/doctor.route';
import patientRoutes from '../src/database/routes/patient.route';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);

app.get('/', (_req, res) => {
    res.status(200).send("Hello World from index!");
});

app.listen(port, () => {
    console.log("Server online -> http://localhost:"+port);
});
