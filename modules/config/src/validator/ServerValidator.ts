import { BaseValidator } from "./BaseValidator";
import { ValidationResponse } from '../types/ValidationResponse';
import { Channel } from '../types/Channel';
import { Role } from '../types/Role';
import { Filter } from '../types/Filter';
import { ServerConfig } from '../interface/ServerConfig';
import { repo } from "../index";

export class ServerValidator extends BaseValidator {
    constructor() {
        super();
    }

    validateServer(data: ServerConfig): ValidationResponse {
        if (!this.validID(data.serverID)) {
            return {
                status: 400,
                content: `Invalid server ID provided: ${data.serverID}`
            };
        }
        const validCh = this.validateServerChannels(data.channels);
        const validR = this.validateServerRoles(data.roles);
        const validF = this.validateServerFilters(data.filters);

        if (validCh.status === 400)
            return validCh;
        if (validR.status === 400)
            return validR;
        if (validF.status === 400)
            return validF;

        try {
            repo.addNewServerConfig(data);
        }
        catch (err) {
            return {
                status: 400,
                content: "Database insert error"
            };
        }

        return {
            status: 200,
            content: `Created server config for ${data.serverID}`
        };
    }

    validateServerChannels(channels: Array<Channel>): ValidationResponse {
        channels.map(ch => {
            if (!this.validChannelName(ch.name) || !this.validID(ch.id))
                return {
                    status: 400,
                    content: `Invalid channel name or ID: ${ch.name}<${ch.id}>`
                }
        });

        return {
            status: 200,
            content: `Valid channels`
        }
    }

    validateServerRoles(roles: Array<Role>): ValidationResponse {
        roles.map(r => {
            if (!this.validID(r.id) || !this.validRoleName(r.name))
                return {
                    status: 400,
                    content: `Invalid role name or ID: ${r.name} <${r.id}>`
                }
        });

        return {
            status: 200,
            content: `Valid roles`
        }
    }

    validateServerFilters(filters: Array<Filter>): ValidationResponse {
        filters.map(f => {
            if (!this.validID(f.id) || !this.validRoleName(f.role) || !this.validFilter(f.filter))
                return {
                    status: 400,
                    content: `Invalid role ID, roleID, or filter: ${f.role}<${f.id}> - ${f.filter}`
                }
        });

        return {
            status: 200,
            content: `Valid filters`
        }
    }
}