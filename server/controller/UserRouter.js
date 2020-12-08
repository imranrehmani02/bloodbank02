const express = require('express');
const userModel = require('../model/UserModel');
const nodemailer = require('nodemailer');
const format = require('string-format');

const router = express.Router()

router.post("/save",(req,res)=>
{
    console.log(req.body)
    userModel.saveUser(req.body,(status)=>
    {
        if(status)
        {
        res.send({msg:"Registered Successfully"})
        }
        else
        {
        res.send({msg:"Register Failed"})
        }
    })
})



router.get('/getuser',(req,res)=>
{
    user = req.session.loginuser
    console.log("getuser session : ",user)
    if(user==undefined)
    {
        res.send({status:false})
    }
    else
    {
        res.send({status:true,user:user})
    }
})

router.post('/login',(req,res)=>
{
    console.log(req.body)
    userModel.loginUser(req.body,(record)=>
    {
        if(record)
        {
            req.session.loginuser = record
            console.log("record in userRouter ",record)
            console.log("value enter in session",req.session.loginuser)
            res.send({status:true, msg:'Login Successfully'})
        }
        else
        {
            res.send({status:false, msg:'Login Failed'})
        }
    })
})

router.get("/otheruser",(req,res)=>
{
    user = req.session.loginuser
    console.log("other user -> session : ",user)
    if(user==undefined)
    {
        res.send({status:false})
    }
    else
    {
        userModel.otherUser(user._id,(records)=>
        {
            console.log(records)
            res.send(records)
        })
    }
})


router.post("/searchuser",(req,res)=>
{
    user = req.session.loginuser
    console.log("session : ",user)

    if(user==undefined)
    {
        res.send({status:false})
    }
    else
    {
        group = req.body.group
        userModel.searchUser(user._id,group,(records)=>
        {
            console.log(records)
            res.send(records)
        })
    }
})

router.get("/logout",(req,res)=>
{
    req.session.destroy()
    res.send({status:true})
})


router.post("/sendmail",(req,res)=>
{
    group = req.body.group
    location = req.body.loc
    person = req.body.person
    phone = req.body.phone
    senders = req.body.sender

    emailSend(person,phone,location,group,senders,()=>
    {
        res.send({status:true})
    })    
})
    
var emailSend  = function(name,phone,location,group,senders,callback)
{
    console.log(senders)
    var msg = format("<html><body><h1>Blood Bank </h1> <hr> <b>Hello User,</b> <br><hr> Urgently blood requirement on following details : <br> Person Name : {0} <br> Phone : {1} <br> Location : {2} <br> Blood Group : {3} <br> Thanks</body></html>",name,phone,location,group)

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
           user: 'justsample4mail@gmail.com',
           pass: 'sample@123'
        }
    });

    for(var x in senders)    
    {
        var to = senders[x]
        const message = {
            from: 'justsample4mail@gmail.com', // Sender address
            to: to,         // List of recipients
            subject: 'Blood Requirement', // Subject line
            html: msg // Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) 
            {
            console.log("mail send error :- ",err)
            callback(false)
            } else {
            console.log("Mail sent :- ",info);
            callback(true)
            }
        });
    }
}
    

module.exports = router