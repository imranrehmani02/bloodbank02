var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://imranrehmani02:qIeojwuyZZkO40zO@cluster0.n3awq.mongodb.net/<dbname>?retryWrites=true&w=majority";

function getConnection(callback)
{
    MongoClient.connect(url, function(err,db)
    {
        if(err)
        {
            callback(false)
        }
        else
        {
            callback(db)
        }
    })
}

module.exports = getConnection