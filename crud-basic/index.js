const express= require("express");
const cors= require("cors");
const ObjectId= require("mongodb").ObjectId
const { MongoClient, ServerApiVersion } = require('mongodb');
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8081;



app.use(morgan("dev"));
app.use(express.json())
app.use(cors())
const uri = `mongodb+srv://junior:WIoYFWjaseiSn0l8@cluster0.niwtq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("crud").collection("student");
//   console.log("db connected successfullay");
//   const user={name:"rahim", email:"rahim@gmail.com", phone:"0186543335"}
//   collection.insertOne(user)
//   .then(()=>{
//     console.log("inserted successfully");
//   })
//   // client.close();
// });
async function run (){

 try{
  await client.connect();
  const dataBase= client.db("crud");
  const userCollection = dataBase.collection("User");

 // post user
 app.post("/users", async (req,res)=>{
   const newUser= req.body;

   const result = await userCollection.insertOne(newUser)
 
   console.log("body",req.body);
   res.json(result)

 })
 //get user
 app.get("/users", async (req,res)=>{
   const cusor= userCollection.find({});
   const users= await cusor.toArray();
   res.send(users)
 })

 // get single user
 app.use("/singleUsers/:id", async (req,res)=>{
   const id = req.params.id;
   const quiry= {_id: ObjectId(id)}
   const result= await userCollection.findOne(quiry);

   res.send(result)
 })

 // delete user 
 app.use('/users/:id',async (req,res)=>{
   const id = req.params.id;
 
   const user= await userCollection.deleteOne({_id:ObjectId(id)});
   res.send(user)

 })

 // update
 app.use("/updateUser/:id", async (req,res)=>{
   const id = req.params.id;
   const newInfo= req.body;
   const quary = {_id:ObjectId(id)}
   const result = await userCollection.findOneAndUpdate(quary,{$set:{name:newInfo.name, email:newInfo.email, phone:newInfo.phone}})
   console.log(result);
   res.send(result)
 })

 }finally{
  // await client.close();
 }

 
}


app.get("/",(req,res)=>{
 res.send("Server is ready for development");

})

app.listen(port,()=>{
  console.log("Listening form port", port);
})

run().catch(console.dir)