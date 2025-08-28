import express from 'express'
import doctorRoutes from '../src/database/routes/doctor.route'

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.use('/doctors', doctorRoutes);

app.get('/', (_req, res) => {
    res.status(200).send("Hello World from index!");
});

app.listen(port, () => {
    console.log("Server online -> http://localhost:"+port);
});
