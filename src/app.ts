import dotenv from 'dotenv';
import express from 'express';
import { errors } from 'celebrate';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import board from './routes/board';
import user from './routes/user';

app.use('/v1/board', board);
app.use('/v1/user', user)

app.use(errors());
app.use(function(err: any, _req: any, res: any, _next: any) {
    const message = err.message;
    const status = err.status ?? 500;
    res.status(status).json({ message })
});

export default app