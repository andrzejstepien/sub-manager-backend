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
    })
    
    router.get('/publications', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.publications)
    })
    
    router.get('/submissions', (req,res)=>{
        res.statusCode=200
        res.send(dbObject.submissions)
    })

    return router
}

export const endpoints = (db) => {
    const router = express.Router()
    endpoint(router,Story,'create','insert',db)
    endpoint(router,Story,'edit','update',db)
    endpoint(router,Story,'delete','del',db)
    endpoint(router,Submission,'create','insert',db)
    endpoint(router,Submission,'edit','update',db)
    endpoint(router,Submission,'delete','del',db)
    endpoint(router,Publication,'create','insert',db)
    endpoint(router,Publication,'edit','update',db)
    endpoint(router,Publication,'delete','del',db)
    return router
}



 const endpoint = (router,Entity,path,method,db) =>{
    router.post(`/${Entity.name.toLowerCase()}/${path}`, async (req,res) => {
        try {  
            logger.trace({data:req.body},"POST request received")
            const entity = new Entity(req.body)
            await entity[method](db)
            res.sendStatus(200)
        } catch (error) {
            logger.error(error)
            if(error instanceof TypeError){
                res.sendStatus(400)
            }
            res.sendStatus(500)
        }
    })
}




