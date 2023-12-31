const{User,Thought}=require('../models')
const userController = {
    //get all users
    async getUsers(req,res){
        try{
            const dbUserData = await User.find()
        .select('-__v')

      res.json(dbUserData);
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //get one user
    async getOneUser(req,res){
        try{
            const dbUserData = await User.findOne({
                _id: req.params.userId
            })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            if (!dbUserData){
                return res.status(404).json({messsage:'no user found'})
            }res.json(dbUserData)
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //create user
    async createUser(req,res){
        try{
            const dbUserData =await User.create(req.body)
            res.json(dbUserData)
        
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //update user
    async updateUser(req,res){
        try{
            const dbUserData =await User.findOneAndUpdate(
                {_id:req.params.userId},
                {$set:req.body},
                {runValidators:true,new:true}
            )
            if (!dbUserData){
                res.status(404).json({message:'error'})
            }
            res.json(dbUserData)
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //delete user
    async deleteUser(req,res){
        try{
            const dbUserData = await User.findOneAndDelete({
                _id:req.params.userId
            })
        if (!dbUserData){
            res.status(404).json({message:'error'})
        }
            res.json(dbUserData)
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //add a friend
    async addFriend(req,res){
        try{
            const dbUserData =await User.findOneAndUpdate({
                _id:req.params.userId
            },
            {
                $addToSet:{friends:req.params.friendId}
            },
            {new:true})
            if (!dbUserData){
                res.status(404).json({message:'error'})
            }
                res.json(dbUserData)
        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    },
    //delete a friend
    async deleteFriend(req,res){
        try{const dbUserData =await User.findOneAndUpdate({
            _id:req.params.userId
        },
        {
            $pull:{friends:req.params.friendId}
        },
        {new:true})
        if (!dbUserData){
            res.status(404).json({message:'error'})
        }
            res.json(dbUserData)

        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    }

}

module.exports = userController