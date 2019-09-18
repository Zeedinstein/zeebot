import axios from 'axios'

export const getFacebookUser = async PSID => {
  try {
    let response = await axios.get(
      `${process.env.FACEBOOK_API_URL}/${PSID}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const sendMessageToCustomer = async (message, PSID) => {
  try {
    let response = await axios.post(
      `${process.env.FACEBOOK_API_URL}/v4.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
      {
        recipient: {
          id: PSID
        },
        message: {
            text: message.text
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
