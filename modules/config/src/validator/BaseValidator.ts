export class BaseValidator {

    numRegex = new RegExp(/^\d+$/);
    channelNameRegex = new RegExp(/^(\d|\w|_)(\d|\w|_|-){0-99}$/);  // starts with /w /d or _. /w /d - _ only. 100 chars max. no consecutive -
    roleNameRegex = new RegExp(/^.{1-100}$/);

    constructor() {}

    validID (id: string): boolean {
        return this.numRegex.test(id);
    } 
    
    validChannelName (ch: string): boolean {
        return this.channelNameRegex.test(ch);
    } 
    
    validRoleName (role: string):boolean {
        return this.roleNameRegex.test(role);
    }

    validFilter (filter: number):boolean {
        try{
            filter/1; // test if number
            return (filter > 0); // test if valid filter value
        }
        catch(e){
            return false
        }
    } 
}