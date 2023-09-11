import Title from "./Title.mjs"
export default class Story extends Title{
    set _word_count(prop){
        if(prop){
            const propNumber = Number(prop)
            if(!Number.isInteger(propNumber)){throw new TypeError("word_count must be integer!")}
            this.word_count=propNumber
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