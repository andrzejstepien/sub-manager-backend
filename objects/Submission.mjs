import Entity from "./Entity.mjs";
import dataValidation from "./dataValidation.mjs";

export default class Submission extends Entity{
    set _story_id(prop){
        if(prop){
            const propNumber = Number.parseInt(prop)
            if(Number.isNaN(propNumber)){throw new TypeError("story_id must be an integer")}
            this.story_id=propNumber
        }
    }
    set _pub_id(prop){
        const propNumber = Number.parseInt(prop)
        if(prop){
            if(Number.isNaN(propNumber)){throw new TypeError("pub_id must be an integer")}
            this.pub_id=propNumber
        }
    }
    set _response_id(prop){
        if(prop){
            const propNumber = Number.parseInt(prop)
            if(Number.isNaN(propNumber)){throw new TypeError("response_id must be an integer")}
            this.response_id=propNumber
        }
    }
    set _date_submitted(prop){
        if(prop){
            if(!dataValidation.dateStringIsValid(prop)){throw new TypeError("response_id must be a valid date in YYYY-MM-DD format")}
            this.date_submitted=prop
        }
    }
    set _date_responded(prop){
        if(prop){
            if(!dataValidation.dateStringIsValid(prop)){throw new TypeError("date_responded must be a valid date in YYYY-MM-DD format")}
            this.date_responded=prop
        }
    }
    get table(){
        return 'subs'
    }
    get idName(){
        return 'sub_id'
    }
    constructor(data){
        super(data)
        this._story_id=data?.story_id
        this._pub_id=data?.pub_id
        this._response_id=data?.response_id
        this._date_submitted=data?.date_submitted
        this._date_responded=data?.date_responded
    }
}