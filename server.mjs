import  express from "express";

const app = express()
const port = 4000
app.use(
  pinoHTTP({
    logger,
  }),
  cors({
    origin: ['http://localhost:5173']
  }),
  bodyParser.json()
)


const data = new Data(db)
await data.init()
app.use('/api',getEndpoints(data))



app.listen(port, (err) => {
    if (err) logger.error(err);
    logger.info("Server listening on PORT " + port)
  })

  export default app