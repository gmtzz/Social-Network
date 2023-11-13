//import router from 'express'
const router=require('express').Router()
//import functions from thought controllers
const{
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} =require('../../controllers/thoughtControllers')
//define routes
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
//export router
module.exports=router