import { ServerConfig } from "../interface/ServerConfig";

import * as mongodb from 'mongodb';
const { connURI } = require('../../../../secrets.json');

export class ConfigRepository {
    public dbclient: mongodb.MongoClient;
    public config: mongodb.Collection;

    constructor() {
        this.connectDB();
    }

    /**
     * adds a new set of server config. should be called upon bot join
     * @param { ServerConfig } data 
     */
    addNewServerConfig(data: ServerConfig): void {
        this.config.insertOne(
            {
                serverID: data.serverID,
                channels: data.channels,
                roles: data.roles,
                filter: data.filters
            }
        ).catch(console.error);
    }

    async connectDB() {
        this.dbclient = new mongodb.MongoClient(connURI);
        console.log("Connecting to database...");

        const db = await this.dbclient.connect();
        if (db) {
            this.config = db.db('vouchbot').collection('config');
            console.log("Connected to config!");
        }
    }
}