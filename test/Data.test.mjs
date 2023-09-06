import { describe } from "mocha";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import { Data } from "../objects/Data.mjs";

describe("Testing Data object...",function(){

    it("once initiated, it should serve arrays at .stories, .publications, and .submissions",async function(){
        const data = new Data(db)
        await data.init()
        expect(data.stories).to.be.a('array')
        expect(data.submissions).to.be.a('array')
        expect(data.publications).to.be.a('array')
    } )
    it("every entry in .stories, .publications, and .submissions should be an object", async function(){
        const data = new Data(db)
        await data.init()
        for (const row of data.stories) {
            expect(row).to.be.a('object')
        }
        for (const row of data.submissions) {
            expect(row).to.be.a('object')
        }
        for (const row of data.publications) {
            expect(row).to.be.a('object')
        }
    })
    it("every entry in .stories, .publications, and .submissions should contain an .id field", async function(){
        const data = new Data(db)
        await data.init()
        for (const row of data.stories) {
            expect(row).to.contain.key('id')
        }
        for (const row of data.submissions) {
            expect(row).to.contain.key('id')
        }
        for (const row of data.publications) {
            expect(row).to.contain.key('id')
        }
    })
})