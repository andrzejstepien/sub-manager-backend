import Entity from "./Entity.mjs";
import dv from "./dv.mjs";
//THIS CLASS WILL HANDLE JUNCTION TABLE STUFF
export default class Title extends Entity{
    set _title(prop){
        if(prop){
            if(!dv.isString(prop)){throw new TypeError("title must be a string")}
            this.title=prop
        }
    }
    set _genres(prop){
        if(prop){
            if(!dv.isObject(prop)){throw new TypeError("genres must be an object")}
            this.genres=prop
        }
    }

    constructor(data){
        super(data)
        this._title = data?.title
        this._genres = data?.genres
    }
}