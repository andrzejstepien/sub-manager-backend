import { describe } from "mocha";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import Story from "../objects/Story.mjs";
chai.use(chaiAsPromised)
describe("testing Story object",function(){
    it("should throw TypeError if .word_count is not an integer",function(){
        expect(()=>{new Story({word_count:1.1})}).to.throw(TypeError)
    })
    it("should have .word_count if created with valid data, and .word_count should be an integer",function(){
        const story = new Story({word_count:100})
        expect(story).to.contain.key('word_count')
        expect(story.word_count).to.satisfy(Number.isInteger)
    })
})