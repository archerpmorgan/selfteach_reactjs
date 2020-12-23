
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes/routes.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/', routes);

const PORT = process.env.PORT|| 5000;

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));