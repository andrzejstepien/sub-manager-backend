import express from "express";
import { Data } from "./Data.mjs";






export const getEndpoints = (data) => {
    const router = express.Router()

    router.get('/stories', (req,res)=>{
        res.send(data.stories)
    })
    
    router.get('/publications', (req,res)=>{
        res.statusCode=200
        res.send(data.publications)
    })
    
    router.get('/submissions', (req,res)=>{
        res.statusCode=200
        res.send(data.submissions)
    })

    return router
}




