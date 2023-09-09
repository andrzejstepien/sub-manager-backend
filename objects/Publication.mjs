import Title from "./Title.mjs";
import dataValidation from "./dataValidation.mjs";
export default class Publication extends Title{
    set _link(prop){
        if(prop){
            if(!dataValidation.isString(prop)){throw new TypeError("link must be a string")}
            this.link=prop
        }
    }
    constructor(data){
        super(data)
        this._link=data?.link
        
    }
}