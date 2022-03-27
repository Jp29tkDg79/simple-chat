import express from 'express';

import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(authRoutes);

export default app;