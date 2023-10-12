const {Thought,User}=require('../models')
const thoughtController ={
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
async deleteThought(req,res){
    try{
        const thoughtData = await Thought.findByIdAndRemove(
            {
                _id:req.params.thoughtId
            }
        )
        if(!thoughtData){
            res.status(404).json({message:'Nothing Here'})
        }
         const userData = await User.findOneAndUpdate(
            {
                thoughts:req.params.thoughtId
            },
            {
                $pull:{thoughts:req.params.thoughtId}
            },
            {new:true}
         )
         if(!userData){
            res.status(404).json({message:'Nothing Here'})
        }

        res.json({message:'thought Deleted'})
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
    
},
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
async removeReaction(req,res){
    try{
        const thoughtData= await Thought.findOneAndUpdate(
            {
                _id:req.params.thoughtId
            },
            {
                $pull:{
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
    
}
}
module.exports=thoughtController