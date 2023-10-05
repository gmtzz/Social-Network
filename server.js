const express = require ('express')
const database = require('./config/connection.js')
const routes = require('./routes')
const port = process.env.port || 3001;
const app = express()
app.use (express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(routes)
database.once('open',()=>{
    app.listen(port,()=>{
        console.log(`app listening on ${port}`)
    })
})