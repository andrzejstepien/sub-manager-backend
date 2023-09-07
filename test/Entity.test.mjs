import { describe } from "mocha";
import Entity from "../objects/Entity.mjs";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
chai.use(chaiAsPromised)

describe("tetsing Entity object",async function(){
    it("should throw with code:400 if passed an invalid data.id",async function(){
        expect(()=>{new Entity({id:"string"})}).to.throw(TypeError)
        expect(()=>{new Entity({id:1.1})}).to.throw(TypeError)
        expect(()=>{new Entity({id:{}})}).to.throw(TypeError)
        expect(()=>{new Entity({id:[]})}).to.throw(TypeError)
    })
    it("should not throw if given a valid id",function(){
        expect(()=>{new Entity({id:1})}).not.to.throw()
    })
    it(".delete() should throw if initialised without .id",function(){
        const entity = new Entity()
        return expect(entity.del(db)).to.eventually.be.rejectedWith(Error)
    })
    it(".delete() should throw if not passed a db",function(){
        const entity = new Entity({id:1})
        return expect(entity.del()).to.eventually.be.rejectedWith(Error)
    })
})