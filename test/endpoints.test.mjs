import {describe} from "mocha";
import chai, { expect }  from "chai";
import bodyParser from "body-parser";
import express from 'express'
import chaiHttp from "chai-http";
import { testDb as db } from "../db.mjs";
import { Data } from "../objects/Data.mjs";
import { beforeEach, afterEach } from "mocha";
import { endpoints, getEndpoints } from "../objects/Endpoints.mjs";
import Submission from "../objects/Submission.mjs"

chai.use(chaiHttp)
const app = express()
const data = new Data(db)
await data.init()
app.use(bodyParser.json())
app.use('/api',getEndpoints(data))
app.use('/api', endpoints(db))



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