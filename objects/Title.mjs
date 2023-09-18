import Entity from "./Entity.mjs";
import dataValidation from "./dataValidation.mjs";
//THIS CLASS WILL HANDLE JUNCTION TABLE STUFF
export default class Title extends Entity{
    set _title(prop){
        if(prop){
            if(!dataValidation.isString(prop)){throw new TypeError("title must be a string")}
            this.title=prop
        }
    }
    set _genres(prop){
        if(prop){
            //if(!dataValidation.isObject(prop)){throw new TypeError("genres must be an object")}
            this.genres=prop
        }
    }
    set _deleted(prop){
        if(prop){
            if(prop===1 || prop===0){
                this.deleted=prop
            }
        }
    }

    constructor(data){
        super(data)
        this._title = data?.title
        this._genres = data?.genres
        this._deleted = data?.deleted
    }
}