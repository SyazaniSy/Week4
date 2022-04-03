
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.mrakc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    if(err){
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB');
   
    try{

        await client.connect();

        const database = client.db("sample_training");
        const collection = database.collection("trips");

        const res = await collection.find({
            "tripduration": {"$lte":70},
            "usertype" : {"$ne":"Subscriber"}
        }).toArray();
        console.log(res)
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
})
