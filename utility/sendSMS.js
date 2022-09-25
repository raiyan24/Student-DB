const axios = require('axios');

//send message
const sendMessage = (to, mess) => {

    axios.get(`https://bulksmsbd.net/api/smsapi?api_key=b0SYzY96wbQWIDQYiUaJ&type=text&number=${to}&senderid=8809601004414&message=${mess}`)
    .then( res => {
        console.log('sms sent')
    })
    .catch( error =>{
        console.log(`Failed`)
    });;

}

module.exports = sendMessage;