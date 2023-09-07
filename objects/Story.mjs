import Title from "./Title.mjs"
export default class Story extends Title{
    constructor(data){
        super(data)
        if(data?.word_count){
            if(!Number.isInteger(data.word_count)){throw new TypeError("word_count must be integer!")}
            this.word_count=data.word_count
        }
    }
}