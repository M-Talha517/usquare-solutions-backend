const sgMail = require('@sendgrid/mail')

const sgMailApiKey = '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'

sgMail.setApiKey(sgMailApiKey)

// ${price}
module.exports.sendEmail = (email, password) => {
    
  console.log(email +" : "+password)
    sgMail.send({
        to: email,
        from: 'noi4trees@gmail.com',
        subject: 'Noi4-Trees - Password Reset',
        text: `Hello. <br> Welocome to Noi4-Trees App. <br> Your new password is: ${password} `,
        html: `<p>Hello. <br> Welocome to Noi4-Trees App. <br>Your new password is: <b>${password}</b></p>`

    }).then(() => {}, error => {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
      });

}

