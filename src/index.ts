import express from 'express'

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_req, res) => {
    res.status(200).send("Hello World from index!");
});


app.listen(port, () => {
    console.log("Server online -> http://localhost:"+port);
});
