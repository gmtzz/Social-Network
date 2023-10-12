const router=require('express').Router()
const{
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} =require('../../controllers/thoughtControllers')
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
module.exports=router