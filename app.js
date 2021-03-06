// load the necessery stuff
const express = require('express')
const path = require('path')
const nodemailer = require('nodemailer')

// get accound credentials
// accont credentials are supposed to be in ''.env file
const acc = require('dotenv').config();

const app = express();

// static folder 
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// functions
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const sendEmail = async (output) => {
    const transporter = nodemailer.createTransport({
      host: "s1.ct8.pl",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'Nodemailer home,<'+process.env.EMAIL_NAME+">", // sender address
      to: "kuborok123434@gmail.com",
      subject: "Contact Request",
      text: "",
      html: output,
    });
    console.log("Message sent: %s", info.messageId);

}


// app.get('/', (req, res) => {
//     // res.render('home', {layout: false});
//     console.log("it's working!")
// });

app.post('/send', (req, res) => {
    console.log(req.body)
    if(validateEmail(req.body.email) && req.body.subject.trim().length > 0 && req.body.message.trim().length > 0 ){
        // there will be sending here
        
        const output = `
        <p> You have a new Contact Request!</p>
        <h3> Details <h3>
    
        <ul>
            <li>
                Name: ${req.body.name}
            </li>
            <li>
                Subject: ${req.body.subject}
            </li>
            <li>
                Email: ${req.body.email}
            </li>
        </ul>
    
        <h3>Message</h3>
        <p>
        ${req.body.message}
        </p>
        `;

        sendEmail(output)


        res.send({data: 'Email sent successfully!'})
    }else{
        res.send({data: 'Email could not be sent due to invalid input!'})
    }
})

app.listen(3000, () => { console.log('server started')})