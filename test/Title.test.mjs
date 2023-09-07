import { describe } from "mocha";
import Title from "../objects/Title.mjs";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import _ from "lodash";
chai.use(chaiAsPromised)

describe("testing Title object",function(){
    it("should throw if passed an invalid title",function(){
        expect(()=>{new Title({title:1})}).to.throw()
        expect(()=>{new Title({title:{}})}).to.throw()
        expect(()=>{new Title({title:[]})}).to.throw()
    })
    it("should have .title if it has been passed a valid one, and it should be a string",function(){
        const title = new Title({title:'Title'})
        expect(title).to.contain.key('title')
        expect(title.title).to.be.a('string')
    })
    it("should throw a TypeError if passed invalid .genres data",function(){
        expect(()=>{new Title({genres:1})}).to.throw(TypeError)
        expect(()=>{new Title({genres:"string"})}).to.throw(TypeError)
        expect(()=>{new Title({genres:[]})}).to.throw(TypeError)
    })
    it("should have .genres if intitialised with valid data, and .genres should be an object",function(){
        const story = new Title({genres:{fantasy:true,horror:false}})
        expect(story).to.contain.key('genres')
        expect(story.genres).to.be.a('object')
    })
    it("every value in correctly initialised .genres should be a boolean",function(){
        const story = new Title({genres:{fantasy:true,horror:false}})
        expect(story?.genres&&
            Object.keys(story.genres).length>0&&
            _.every(story.genres,genre=>{return typeof genre === 'boolean'})).to.equal(true)
    })
})