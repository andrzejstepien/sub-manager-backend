import { describe } from "mocha";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import Publication from "../objects/Publication.mjs";
chai.use(chaiAsPromised)
describe("testing Publication object",function(){
    it("should throw TypeError if passed invalid .link data",function(){
        expect(()=>{new Publication({link:1})}).to.throw(TypeError)
        expect(()=>{new Publication({link:[]})}).to.throw(TypeError)
        expect(()=>{new Publication({link:{}})}).to.throw(TypeError)
    })
    it("should have a .link if initialised with valid data, and .link should be a string",function(){
        const pub = new Publication({link:'string'})
        expect(pub).to.contain.key('link')
        expect(pub.link).to.be.a('string')
    })
})