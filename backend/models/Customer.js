import { Schema, model } from 'mongoose'

const Customer = new Schema({
  psid: String,
  first_name: String,
  last_name: String,
  profile_pic: String,
  conversation: [
    {
      sender: String,
      mid: String,
      text: String
    }
  ]
})

const CustomerModel = model('Customer', Customer)
export default CustomerModel
