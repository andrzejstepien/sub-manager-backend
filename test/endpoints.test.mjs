import {describe} from "mocha";
import chai, { expect }  from "chai";
import express from 'express'
import chaiHttp from "chai-http";
import { testDb as db } from "../db.mjs";
import { Data } from "../objects/Data.mjs";
import { getEndpoints } from "../objects/Endpoints.mjs";

chai.use(chaiHttp)
const app = express()
const data = new Data(db)
await data.init()
app.use('/api',getEndpoints(data))



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