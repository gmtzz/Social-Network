// mongoose model for User
const {Schema,model} = require ('mongoose')
const userSchema = new Schema(

    { //username of user
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        }, //email of user
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        thoughts: [ //array of thoughts
          {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
        ],
        friends: [ //array of friends
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
      { //json virtuals
        toJSON: {
          virtuals: true,
        },
        id: false,
      }

) //definefriendCount virtual
userSchema.virtual('friendCount').get(function(){
    return this.friends.length
}) //create the User model using the userSchema
const User = model('User',userSchema)
//export the User model
module.exports = User