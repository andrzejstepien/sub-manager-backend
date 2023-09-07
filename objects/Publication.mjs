import Title from "./Title.mjs";
import dv from "./dv.mjs";
export default class Publication extends Title{
    constructor(data){
        super(data)
        if(data?.link){
            if(!dv.isString(data.link)){throw new TypeError("link must be a string")}
            this.link=data.link
        }
        
    }
}