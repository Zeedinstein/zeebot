export default {
  psid: String,
  first_name: String,
  last_name: String,
  profile_pic: String,
  conversation: [
    {
      sender: String,
      text: String
    }
  ]
};
