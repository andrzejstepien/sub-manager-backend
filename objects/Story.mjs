import Title from "./Title.mjs"
export default class Story extends Title{
    set _word_count(prop){
        if(prop){
            if(!Number.isInteger(Number(prop))){throw new TypeError("word_count must be integer!")}
            this.word_count=prop
        }     
    }
    get table(){
        return 'stories'
    }
    constructor(data){
        super(data)
        this._word_count=data?.word_count
    }
}