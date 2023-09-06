import express from "express"
import pinoHTTP from 'pino-http'
import logger from "./logger.mjs";
import bodyParser from "body-parser";
import { Data } from "./objects/Data.mjs";
import { db } from "./db.mjs";
import { getEndpoints } from "./objects/Endpoints.mjs";
import cors from 'cors'

const app = express()
const port = 4000
const corsOptions={
  origin: ['http://localhost:5173']
}
app.use(cors())
app.use(pinoHTTP({logger}))
app.use(bodyParser.json())
  



const data = new Data(db)
await data.init()

app.use('/api',getEndpoints(data))



app.listen(port, (err) => {
    if (err) logger.error(err);
    logger.info("Server listening on PORT " + port)
  })

  export default app