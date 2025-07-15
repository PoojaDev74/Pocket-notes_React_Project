const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://poojapreethi2001:Sunshine1@cluster1.qzrxyzk.mongodb.net")
.then(()=>{
    console.log("connection established")
}).catch((err)=>{
    console.log(`Error is : ${err}`)
})
