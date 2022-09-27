import express from 'express';
import { chRouter } from './ChannelRoutes';
import { roleRouter } from './RoleRoutes';
import { filterRouter } from './FilterRoutes';
import { ServerConfig } from '../interface/ServerConfig';
import { ServerValidator } from '../validator/ServerValidator';
import { ValidationResponse } from '../types/ValidationResponse';

export const router = express.Router();
const serverV = new ServerValidator();

router.use('/server/:serverID/', chRouter);
router.use('/server/:serverID/', roleRouter);
router.use('/server/:serverID/', filterRouter);

router.post('/server', (req, res) => {
    try{
        const serverConfig: ServerConfig = req.body;
        const valres: ValidationResponse = serverV.validateServer(serverConfig);
        res.status(valres.status).send(valres.content);
    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
});

router.get('/server', (req, res) => {

});

router.get('/server/:serverID', (req, res) => {

});

router.put('/server/:serverID', (req, res) => {

});

router.delete('/server/:serverID', (req, res) => {

});