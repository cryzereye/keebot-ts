import { FindCursor } from "mongodb";
import { ServerConfig } from "../interface/ServerConfig";

export class ServerTransformer {
    constructor() { }

    async toResponse(data: FindCursor): Promise<string> {
        let dataA = await data.toArray();
        return JSON.stringify(dataA);
    }
}