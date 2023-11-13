import Title from "./Title.mjs"
import logger from "../logger.mjs"
export default class Story extends Title{
    set _word_count(prop){
        if(prop){
            const propNumber = Number.parseInt(prop)
            if(Number.isNaN(propNumber)){throw new TypeError("word_count must be integer!")}
            this.word_count=propNumber
        }     
    }
    get table(){
        return 'stories'
    }
    get idName(){
        return 'story_id'
    }
    constructor(data){
        super(data)
        this._word_count=data?.word_count
        logger.trace(this)
    }
}