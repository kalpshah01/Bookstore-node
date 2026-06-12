const mongoose=require('mongoose');

const db=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/userData').then(()=>{

    console.log("Database Connected ...");
}).catch((err)=>{

      console.log("ERR-->",err);
  })
}
  
module.exports=db;