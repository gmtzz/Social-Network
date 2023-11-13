// impor the Schema constructor from Mongoose
const {Schema,Types} = require ('mongoose')
const dateFormat = require('../utils/dateFormat')
//define the reaction schema
const reactionSchema = new Schema(
    {   //unique id for reaction
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        //the body of the reaction
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280
        },
        //the username of the user who created the reaction
        username: {
          type: String,
          required: true
        },
        //timestamp
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        }
      },
      { //configure toJSON to use virtuals
        toJSON: {
          getters: true
        },
        id: false
      }
)
//export reactionSchema
module.exports = reactionSchema