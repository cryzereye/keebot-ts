import { Channel } from "../types/Channel";
import { Filter } from "../types/Filter";
import { Role } from "../types/Role";

export interface ServerConfig {
    serverID: string;
    channels: Array<Channel>;
    roles: Array<Role>;
    filters: Array<Filter>
}