module.exports = {
  mail: {
    host: process.env.TKY_NOTIFIER_MAIL_SMTP_HOST,
    port: process.env.TKY_NOTIFIER_MAIL_SMTP_PORT,
    secure: true,
    password: process.env.TKY_NOTIFIER_MAIL_PASSWORD,
    email: process.env.TKY_NOTIFIER_MAIL_ADDRESS
  },
  sms: {
    url: process.env.TKY_NOTIFIER_SMS_URL,
    port: process.env.TKY_NOTIFIER_SMS_PORT,
    version: process.env.TKY_NOTIFIER_SMS_VERSION,
    appId: process.env.TKY_NOTIFIER_SMS_APP_ID,
    accountSid: process.env.TKY_NOTIFIER_SMS_ACCOUNT_SID,
    accountToken: process.env.TKY_NOTIFIER_SMS_ACCOUNT_TOKEN
  }
};
