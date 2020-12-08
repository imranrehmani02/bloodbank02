const mongo = require("./db")
var {ObjectId} = require('mongodb')

var user = function()
{
    this.saveUser = function (data,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('bloodbank')
                db.collection('user').insertOne(data,function(err,res)
                {
                    if(err)
                    {
                        console.log("insert failed !!")
                        callback(false)
                    }
                    else
                    {
                        callback(true)
                    }
                })
            }
            else
            {
                console.log("Database connection error")
                callback(false)
            }
        })
    }

    this.loginUser = function(data,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('bloodbank')
                var ob = {email:data.email,pass:data.pass};

                db.collection('user').findOne(ob,function(err,res)
                {
                    if(err)
                    {
                        console.log("login failed : ",err)
                        callback(false)
                    }
                    else
                    {
                        console.log(res)
                        if(res==null)
                        callback(false)
                        else
                        callback(res)
                    }
                })
            }
            else
            {
                console.log("Connection not Done !!!")
                callback(false)
            }
        })
    }

    this.otherUser = function(uid,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('bloodbank')
                var ob = {_id:{$ne:ObjectId(uid)}}
                db.collection('user').find(ob).toArray(function(err,res)
                {
                    if(err)
                    {
                        console.log("Others Failed : ",err)
                        callback(false)
                    }
                    else
                    {
                        console.log(res)
                        if(res==null)
                        callback(false)
                        else
                        callback(res)
                    }
                })
            }
            else
            {
                console.log("Database connection error")
                callback(false)
            }
        })
    }

    this.searchUser = function(uid,group,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('bloodbank')
                var ob = {_id:{$ne:ObjectId(uid)},group:group}
                db.collection('user').find(ob).toArray(function(err,res)
                {
                    if(err)
                    {
                        console.log("search failed : ",err)
                        callback(false)
                    }
                    else
                    {
                        console.log(res)
                        if(res==null)
                        callback(false)
                        else
                        callback(res)
                    }
                })
            }
            else
            {
                console.log("Connection not done");
                callback(false)
            }
        })
    }
}

module.exports = new user()