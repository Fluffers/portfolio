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


// app.get('/', (req, res) => {
//     // res.render('home', {layout: false});
//     console.log("it's working!")
// });

app.post('/send', (req, res) => {
    console.log(req.body);

    if(req.body.email != '' && req.body.message != ''){
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
    
        async function main() {
    
            let transporter = nodemailer.createTransport({
              host: "s1.ct8.pl",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASS,
              },
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: 'Nodemailer home,<'+process.env.EMAIL_NAME+">", // sender address
              to: "kuborok123434@gmail.com",
              subject: "Contact Request",
              text: "",
              html: output,
            });
            console.log("Message sent: %s", info.messageId);
    
            
            //res.render('home', {layout: false, msg:'Message has been sent!'})
            //res.writeHead(200, {'Content-Type': 'text/html'})
            res.redirect("/?sent=1")

        }
          
        main().catch(console.error);
    }else{
        //res.render('home', {layout: false, msg:'Whoops! Message could not be sent!'})
        res.redirect("/?sent=0")
    }

})

app.post('/test', (req, res) => {
    console.log(req.body)
    res.set('Content-Type', 'text/plain');
    res.send({data: 'wob wob wob'})
})

app.listen(3000, () => { console.log('server started')})