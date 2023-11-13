//import router from 'express'
const router= require('express').Router()
//import the functions from  user controllers
const {getUsers,getOneUser,
    createUser,updateUser,
    deleteUser,addFriend,deleteFriend}=require('../../controllers/userController')
    //define routes
    router.route('/').get(getUsers).post(createUser)
    router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser)
    router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)
    //export router
    module.exports = router