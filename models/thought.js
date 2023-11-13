//import model and Schema from mongoose
const {Schema,model} = require ('mongoose')
const reactionSchema = require('./reaction.js')
const dateFormat = require('../utils/dateFormat')
const thoughtSchema = new Schema(
    { //text count limit
        thoughtText: {
          type: String,
          required: 'You need to leave a thought!',
          minlength: 1,
          maxlength: 280
        }, //timestamp
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        },//username of thought creator
        username: {
          type: String,
          required: true
        }, //reactions
        reactions: [reactionSchema]
      },
      { //configure toJSON to use virtuals
        toJSON: {
          getters: true
        },
        id: false
      }  
) //virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
}) //create the Thought model using the thoughtSchema
const Thought = model('Thought',thoughtSchema)
module.exports = Thought