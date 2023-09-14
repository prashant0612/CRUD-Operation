const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/UserInformation", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected with MongoDB")
}).catch((err) => {
  console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const dataSchema = new mongoose.Schema({
  name: String,
  class: Number,
  roll : Number,
})

const Data = new  mongoose.model("Data", dataSchema)

// Create Data
app.post("/api/v1/data/new", async (req, res) => {

    const data = await Data.create(req.body);

    res.status(201).json({
      success: true,
      data
  })
})

//Read Data
app.get("/api/v1/datas", async (req, res) => {

  const datas = await Data.find();

  res.status(200).json({
    success: true,
    datas
})
})


//Update Data
app.put("/api/v1/data/:id", async (req, res) => {

  let data = await Data.findById(req.params.id);

  if(!data){
    return res.status(500).json({
      sucess:false,
      message:"Product Not Found"
    })
  }

data = await Data.findByIdAndUpdate(req.params.id,req.body,{new:true,
   useFindAndModify:false,
   runValidators:true
  
})

  res.status(200).json({
    success: true,
    data
})
})


//Delete User Details
app.delete("/api/v1/data/:id", async (req, res) => {

  const data = await Data.findById(req.params.id);

  if(!data){
    return res.status(500).json({
      sucess:false,
      message:"Product Not Found"
    });
  }

   await data.deleteOne();
  
  res.status(200).json({
    success: true,
    message:"Product is deleted Sucessfully"
});

})






app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
