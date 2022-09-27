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
    addNewServerConfig(data: ServerConfig): Object {
        return this.config.findOneAndUpdate(
            { serverID: data.serverID },
            {
                $set: {
                    serverID: data.serverID,
                    channels: data.channels,
                    roles: data.roles,
                    filter: data.filters
                }
            },
            {
                upsert: true
            }
        ).catch(console.error);
    }

    /**
     * 
     * @param {string} serverID 
     * @returns {Object}
     */
    getServerConfig(serverID: string): Object {
        return this.config.findOne(
            { serverID: serverID }
        );
    }

    /**
     * 
     * @param {string} serverID 
     * @returns {Object}
     */
     async getAllServerConfig(): Promise<mongodb.FindCursor> {
        return await this.config.find({});
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