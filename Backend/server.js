const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path:  '.env'
})

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors({
    origin:[
        "*","https://blog-frontend-amber-ten.vercel.app/"
    ],
    methods:["POST","GET"],
    credentials:true
}))

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

app.use(express.static(path.join(__dirname , "public") ))

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})
app.get("/", async (req, res) => {

    return res.status(200).json({ message: "Todo app server is up and running!"})

})
module.exports = app;