import express from "express";
import logger from "../logger.mjs";
import Story from "./Story.mjs"
import Publication from "./Publication.mjs"
import Submission from "./Submission.mjs";






export const getEndpoints = (dbObject) => {
    const router = express.Router()

    router.get('/stories', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.stories)
        return
    })
    
    router.get('/publications', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.publications)
        return
    })
    
    router.get('/submissions', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.submissions)
        return
    })
    router.get('/responses', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.responses)
        return
    })

    return router
}

export const postEndpoints = (db,data) => {
    const router = express.Router()
    endpoint(router,Story,'create','insert',db,data)
    endpoint(router,Story,'edit','update',db,data)
    endpoint(router,Story,'delete','update',db,data)
    endpoint(router,Submission,'create','insert',db,data)
    endpoint(router,Submission,'edit','update',db,data)
    endpoint(router,Submission,'delete','update',db,data)
    endpoint(router,Publication,'create','insert',db,data)
    endpoint(router,Publication,'edit','update',db,data)
    endpoint(router,Publication,'delete','del',db,data)
    return router
}



 const endpoint = (router,Entity,path,method,db,data) =>{
    router.post(`/${Entity.name.toLowerCase()}/${path}`, async (req,res) => {
        try {  
            logger.trace({data:req.body},"POST request received")
            const entity = new Entity(req.body)
            await entity[method](db)
            res.sendStatus(200)
            data.init()
            return
        } catch (error) {
            logger.error(error)
            if(error instanceof TypeError){
                res.sendStatus(400)
                return
            }
            res.sendStatus(500)
            return
        }
    })
}




