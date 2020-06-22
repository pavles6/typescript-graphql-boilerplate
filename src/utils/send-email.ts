import nodemailer from 'nodemailer'

type EmailType = 'forgot-password' | 'activate-account'

export const sendEmail = async (
  email: string,
  url: string,
  type: EmailType
): Promise<any> => {
  let testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  let preset = {}

  if (type == 'forgot-password')
    preset = {
      from: '"Password change request | Websitename" <noreply@websitename.com>', // sender address
      to: email, // list of receivers
      subject: 'Confirm your email', // Subject line
      text: `Activate your account :${url}`, // plain text body
      html: `<a href="${url}">Activate your account.</a>`, // html body
    }

  if (type == 'activate-account')
    preset = {
      from: '"Email Confirmation | Websitename" <noreply@websitename.com>', // sender address
      to: email, // list of receivers
      subject: 'Activate your account', // Subject line
      text: `Activate your account by clicking on a link: ${url}`, // plain text body
      html: `<a href="${url}">Activate your account.</a>`, // html body
    }

  const info = await transporter.sendMail(preset)

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
