import { describe } from "mocha";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import Submission from "../objects/Submission.mjs"
chai.use(chaiAsPromised)
describe("testing Submission object",function(){
    it("should throw if passed invalid")
})