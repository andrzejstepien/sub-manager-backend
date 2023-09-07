import Title from "./Title.mjs";
import dv from "./dv.mjs";
export default class Publication extends Title{
    set _link(prop){
        if(prop){
            if(!dv.isString(prop)){throw new TypeError("link must be a string")}
            this.link=prop
        }
    }
    constructor(data){
        super(data)
        this._link=data?.link
        
    }
}