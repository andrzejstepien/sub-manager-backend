import Entity from "./Entity.mjs";
import dv from "./dv.mjs";
//THIS CLASS WILL HANDLE JUNCTION TABLE STUFF
export default class Title extends Entity{
    constructor(data){
        super(data)
        if(data?.title){
            if(!dv.isString(data.title)){throw new TypeError("title must be a string")}
            this.title=data.title
        }
        if(data?.genres){
            if(!dv.isObject(data.genres)){throw new TypeError("genres must be an object")}
            this.genres=data.genres
        }
    }
}