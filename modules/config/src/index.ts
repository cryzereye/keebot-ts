import express from 'express';

import { router } from './controller/ServerRoutes';
import { ConfigRepository } from './repo/ConfigRepository';

const app = express();
export const repo = new ConfigRepository();

app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
    console.log('Config module listening on port 3000!');
})