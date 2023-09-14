import { describe } from "mocha";
import { expect} from "chai";
import { testDb as db } from "../db.mjs";
import { Data } from "../objects/Data.mjs";

describe("Testing Data object...",function(){

    it("once initiated, it should serve arrays at .stories, .publications, and .submissions",async function(){
        const data = await new Data(db).init()
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
    it("every entry in .stories and .publications should contain an .submissions field", async function(){
        const data = await new Data(db).init()
        for (const row of data.stories) {
            expect(row).to.contain.key('submissions')
        }
        for (const row of data.publications) {
            expect(row).to.contain.key('submissions')
        }
    })
    it("the submissions field of the .stories and .publications array should itself be an array",async function(){
        const data = await new Data(db).init()
        for (const row of data.stories) {
            expect(row.submissions).to.be.a('array')
        }
        for (const row of data.publications) {
            expect(row.submissions).to.be.a('array')
        }
    })
    it("once initiated, it should serve arrays at .getSubmissionsByStoryId and getSubmissionsByPublicationId()",async function(){
        const data = new Data(db)
        await data.init()
        expect(data.getSubmissionsByStoryId()).to.be.a('array')
        expect(data.getSubmissionsByPublicationId()).to.be.a('array')
    } )
    it("when passed a valid id, every entry in the arrays returned by .getSubmissionsByStoryId and getSubmissionsByPublicationId() should contain an .id field", async function(){
        const data = new Data(db)
        await data.init()
        for (const row of data.getSubmissionsByStoryId(1)) {
            expect(row).to.contain.key('id')
        }
        for (const row of data.getSubmissionsByPublicationId(1)) {
            expect(row).to.contain.key('id')
        }
    })
    it("getGenresByStoryId() should return an array",async function(){
        const data = new Data(db)
        await data.init()
        const res = await data.getGenresByStoryId(1)
        console.dir(res)
        expect(res).to.be.a('array')
    })
    it("getGenresByPublicationId() should return an array",async function(){
        const data = new Data(db)
        await data.init()
        const res = await data.getGenresByPublicationId(1)
        expect(res).to.be.a('array')
    })
})