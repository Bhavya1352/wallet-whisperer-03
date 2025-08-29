const twilio = require('twilio');

// Twilio credentials (you need to get these from Twilio console)
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';

const client = twilio(accountSid, authToken);

const sendOTP = async (phoneNumber, otp) => {
  try {
    // Format phone number (add +91 for India)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const message = await client.messages.create({
      body: `Your Wallet Whisperer OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`,
      from: twilioPhoneNumber,
      to: formattedPhone
    });

    console.log('SMS sent successfully:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendOTP };