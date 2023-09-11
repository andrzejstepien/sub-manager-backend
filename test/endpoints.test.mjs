import {describe} from "mocha";
import chai, { expect }  from "chai";
import bodyParser from "body-parser";
import express from 'express'
import chaiHttp from "chai-http";
import { testDb as db } from "../db.mjs";
import { Data } from "../objects/Data.mjs";
import { beforeEach, afterEach } from "mocha";
import { postEndpoints, getEndpoints } from "../objects/Endpoints.mjs";

chai.use(chaiHttp)
const app = express()
const data = new Data(db)
await data.init()
app.use(bodyParser.json())
app.use('/api',getEndpoints(data))
app.use('/api', postEndpoints(db))


describe("testing endpoints...",async function(){
describe("Testing GET endpoints", async function(){
    describe("GET stories",async function(){
        it("should return a status code of 200 and an array", async function(){
            const res = await chai.request(app).get('/api/stories')
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
        })
    })
    describe("GET submissions",async function(){
        it("should return a status code of 200 and an array", async function(){
            const res = await chai.request(app).get('/api/submissions')
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
        })
    })
    describe("GET publications",async function(){
        it("should return a status code of 200 and an array", async function(){
            const res = await chai.request(app).get('/api/publications')
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
        })
    })
})
describe("testing /create endpoints", async function(){
    
    describe("/story/create",async function(){
        const goodData = {
            title:"#test",
            word_count:111
        } 
        const badData = {
            title:1,
            word_count:"not a number"
        }
        afterEach(async function(){
            await db('stories')
        .where('title',goodData.title)
        .del()
        })
        it("should return 200 if a valid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/story/create')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 if an invalid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/story/create')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the new entry should exist in the database",async function(){
            await chai.request(app)
            .post('/api/story/create')
            .send(goodData)
            const res = await db('stories')
            .select('*')
            .where('title',goodData.title)
            expect(res[0].title).to.eql(goodData.title)
        })
        
    })
    describe("/publication/create",async function(){
        const goodData = {
            title:"#test",
            link:"www.internet.com"
        } 
        const badData = {
            title:1,
            link:1
        }
        afterEach(async function(){
            await db('pubs')
        .where('title',goodData.title)
        .del()
        })
        it("should return 200 if a valid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/publication/create')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 if an invalid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/publication/create')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the new entry should exist in the database",async function(){
            await chai.request(app)
            .post('/api/publication/create')
            .send(goodData)
            const res = await db('pubs')
            .select('*')
            .where('title',goodData.title)
            expect(res[0].title).to.eql(goodData.title)
        })
        
    })
    describe("/submission/create",async function(){
        const goodData = {
            story_id:1,
            pub_id:1,
            response_id:1,
            date_submitted:"1066-01-01",
            date_responded:"1066-01-01"
        } 
        const badData = {
            story_id:"string",
            pub_id:1,
            response_id:1,
            date_submitted:"1066-01-01",
            date_responded:"1066-01-01"
        }
        afterEach(async function(){
            await db('subs')
        .where('date_submitted',goodData.date_submitted)
        .del()
        })
        it("should return 200 if a valid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/submission/create')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 if an invalid request is made",async function(){
            const res = await chai.request(app)
            .post('/api/submission/create')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the new entry should exist in the database",async function(){
            await chai.request(app)
            .post('/api/submission/create')
            .send(goodData)
            const res = await db('subs')
            .select('*')
            .where('date_submitted',goodData.date_submitted)
            expect(res[0].date_responded).to.eql(goodData.date_responded)
        })
        
    })
})
describe("testing /edit endpoints",async function(){
    describe("/story/edit",async function(){
        const goodData = {
            id:1,
            title:"#test",
            word_count:111
        } 
        const badData = {
            id:"string"
        }
        let prev = {}
        beforeEach(async function(){
            prev = await db('stories')
            .select('*')
            .where('id',1)
            prev = prev[0]
        })
        afterEach(async function(){
            await db('stories')
            .where('id',1)
            .update(prev)
        })
        it("should return 200 when sent valid data",async function(){
            const res = await chai.request(app)
            .post('/api/story/edit')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 when sent invalid data",async function(){
            const res = await chai.request(app)
            .post('/api/story/edit')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the edit should be reflected in the database",async function(){
            await chai.request(app)
            .post('/api/story/edit')
            .send(goodData)
            const res = await db('stories').
            select('*')
            .where('id',goodData.id)
            expect(res[0]).to.eql(goodData)
        })

    })
    describe("/publication/edit",async function(){
        const goodData = {
            id:1,
            title:"#test",
            link:"link"
        } 
        const badData = {
            id:"string"
        }
        let prev = {}
        beforeEach(async function(){
            prev = await db('pubs')
            .select('*')
            .where('id',1)
            prev = prev[0]
        })
        afterEach(async function(){
            await db('pubs')
            .where('id',1)
            .update(prev)
        })
        it("should return 200 when sent valid data",async function(){
            const res = await chai.request(app)
            .post('/api/publication/edit')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 when sent invalid data",async function(){
            const res = await chai.request(app)
            .post('/api/publication/edit')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the edit should be reflected in the database",async function(){
            await chai.request(app)
            .post('/api/publication/edit')
            .send(goodData)
            const res = await db('pubs').
            select('*')
            .where('id',goodData.id)
            expect(res[0]).to.eql(goodData)
        })

    })
    describe("/submission/edit",async function(){
        const goodData = {
            id:1,
            story_id:1,
            pub_id:1,
            response_id:1,
            date_submitted:"1066-01-01",
            date_responded:"1066-01-01"
        } 
        const badData = {
            story_id:"string",
            pub_id:1,
            response_id:1,
            date_submitted:"1066-01-01",
            date_responded:"1066-01-01"
        }
        let prev = {}
        beforeEach(async function(){
            prev = await db('subs')
            .select('*')
            .where('id',1)
            prev = prev[0]
        })
        afterEach(async function(){
            await db('subs')
            .where('id',1)
            .update(prev)
        })
        it("should return 200 when sent valid data",async function(){
            const res = await chai.request(app)
            .post('/api/submission/edit')
            .send(goodData)
            expect(res).to.have.status(200)
        })
        it("should return 400 when sent invalid data",async function(){
            const res = await chai.request(app)
            .post('/api/submission/edit')
            .send(badData)
            expect(res).to.have.status(400)
        })
        it("the edit should be reflected in the database",async function(){
            await chai.request(app)
            .post('/api/submission/edit')
            .send(goodData)
            const res = await db('subs').
            select('*')
            .where('id',goodData.id)
            expect(res[0]).to.eql(goodData)
        })

    })
})
describe("testing /delete endpoints",async function(){
    describe("/story/delete",async function(){
        it("item should be deleted from db",async function(){
            let id = await db('stories').
        insert({
            title:"#test",
            word_count:500
        })
        .returning('id')
        id=id[0].id

        await chai.request(app)
        .post('/api/story/delete')
        .send({id})

        const res = await db('stories')
        .select('*')
        .where('id',id)
        expect(res).to.have.lengthOf(0)
        })

        await db('stories')
        .where('title','#test')
        .del()
    })
    describe("/publication/delete",async function(){
        it("item should be deleted from db",async function(){
            let id = await db('pubs').
        insert({
            title:"#test",
            link:'link'
        })
        .returning('id')
        id=id[0].id

        await chai.request(app)
        .post('/api/publication/delete')
        .send({id})

        const res = await db('pubs')
        .select('*')
        .where('id',id)
        expect(res).to.have.lengthOf(0)
        })

        await db('pubs')
        .where('title','#test')
        .del()
    })
    describe("/submission/delete",async function(){
        it("item should be deleted from db",async function(){
            let id = await db('subs').
        insert({
            story_id:1,
            pub_id:1,
            response_id:1,
            date_submitted:"1066-01-01",
            date_responded:"1066-01-01"
        })
        .returning('id')
        id=id[0].id

        await chai.request(app)
        .post('/api/submission/delete')
        .send({id})

        const res = await db('subs')
        .select('*')
        .where('id',id)
        expect(res).to.have.lengthOf(0)
        })

        await db('subs')
        .where('date_submitted','1066-01-01')
        .del()
    })
})
})