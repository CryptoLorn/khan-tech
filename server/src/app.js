import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize } from './db.js';
import { configs } from './configs/config.js';
import * as model from './models/dependencies.js';
import { router } from './routes/index.js';
import { handlerError } from './errors/handler.error.js';

const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: configs.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(handlerError);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(configs.PORT, () => console.log(`Server on port ${configs.PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();