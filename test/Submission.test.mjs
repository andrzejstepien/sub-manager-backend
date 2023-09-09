import { describe } from "mocha";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import Submission from "../objects/Submission.mjs"
chai.use(chaiAsPromised)
describe("testing Submission object",function(){
    it("should throw if passed invalid story_id", function(){
        expect(()=>{new Submission({story_id:"string"})}).to.throw(TypeError)
        expect(()=>{new Submission({story_id:[]})}).to.throw(TypeError)
        expect(()=>{new Submission({story_id:{}})}).to.throw(TypeError)
    })
    it("should throw if passed invalid pub_id", function(){
        expect(()=>{new Submission({pub_id:"string"})}).to.throw(TypeError)
        expect(()=>{new Submission({pub_id:[]})}).to.throw(TypeError)
        expect(()=>{new Submission({pub_id:{}})}).to.throw(TypeError)
        
    })
    it("should throw if passed invalid response_id", function(){
        expect(()=>{new Submission({response_id:"string"})}).to.throw(TypeError)
        expect(()=>{new Submission({response_id:[]})}).to.throw(TypeError)
        expect(()=>{new Submission({response_id:{}})}).to.throw(TypeError)
    })
    it("should throw if passed invalid date_submitted", function(){
        expect(()=>{new Submission({date_submitted:"01-01-9999"})}).to.throw(TypeError)
        expect(()=>{new Submission({date_submitted:"not even a date"})}).to.throw(TypeError)
        expect(()=>{new Submission({date_submitted:{}})}).to.throw(TypeError)
        
    })
    it("should throw if passed invalid date_resonded", function(){
        expect(()=>{new Submission({date_responded:"01-01-9999"})}).to.throw(TypeError)
        expect(()=>{new Submission({date_responded:"not even a date"})}).to.throw(TypeError)
        expect(()=>{new Submission({date_responded:{}})}).to.throw(TypeError)
    })
    it("should create an object with enumerable props equal to it's input if passed correct data", function(){
        const goodData = {
            pub_id:1,
            story_id:1,
            response_id:1,
            date_submitted:'1999-01-01',
            date_responded: '1999-01-02'
        }
        const submission = new Submission(goodData)
        expect(submission).to.eql(goodData)
    })
    
})