//api routes
const router = require('express').Router()
const userRoutes=require('./userRoutes.js')
const thoughtRoutes=require('./thoughtRoutes.js')
//import routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
//export
module.exports = router
