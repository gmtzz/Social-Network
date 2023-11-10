//import
const router = require('express').Router()
const apiRoutes = require('./api')
router.use('/api',apiRoutes)
//middleware
router.use((req,res)=>{
    return res.send('wrongRoute')
})
//export
module.exports=router