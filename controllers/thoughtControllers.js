
//import models
const {Thought,User}=require('../models')
const thoughtController ={
    //get all thoughts
async getAllThoughts(req,res){
    try{
       const thoughtData=await Thought.find().sort({
        createdAt:-1
       }) 
       res.json(thoughtData)
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
//get one thought
async getOneThought(req,res){
    try{
        const thoughtData=await Thought.findOne(
            {
                _id:req.params.thoughtId
            }
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }
        res.json(thoughtData)
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
//create a thought
async createThought(req,res){
    try{
        const thoughtData = await Thought.create(req.body)
        const dbUserData = await User.findOneAndUpdate(
        {_id:req.body.userId},
        {$push:{thoughts:thoughtData._id}},
        {new:true}
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }
        res.json(thoughtData)
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
//update a thought
async updateThought(req,res){
    try{
        const thoughtData =await Thought.findOneAndUpdate(
            {
                _id:req.params.thoughtId
            }, 
            {
                $set:req.body
            },
            {
                runValidators:true
            },
            {
                new:true
            }
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }
        res.json(thoughtData)
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
//delete thought
async deleteThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndRemove({
            _id: req.params.thoughtId
        });

        if (!thoughtData) {
            return res.status(404).json({ message: 'Message Deleted' });
        }

        const userData = await User.findOneAndUpdate(
            {
                thoughts: req.params.thoughtId
            },
            {
                $pull: { thoughts: req.params.thoughtId }
            },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: 'Message Deleted' });
        }

        return res.json({ message: 'thought Deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
},
//add a reaction 
async addReaction(req,res){
    try{
        const thoughtData= await Thought.findOneAndUpdate(
            {
                _id:req.params.thoughtId
            },
            {
                $addToSet:{
                    reactions:req.body
                }
            },
            {runValidators:true,new:true}
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }

        res.json(thoughtData)
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
//remove reaction 
async removeReaction(req,res){
    try{
        const thoughtData= await Thought.findOneAndUpdate(
            {
                _id:req.params.thoughtId
            },
            {
                $pull:{
                    reactions:{reactionId:req.params.reactionId}
                }
            },
            {runValidators:true,new:true}
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }

        res.json(thoughtData)
        
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
}
}
module.exports=thoughtController