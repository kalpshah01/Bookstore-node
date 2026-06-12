const mongoose=require('mongoose');

const schema=mongoose.Schema({
    bookno:Number,
    bookname:String,
    issuedate:Date,
    returndate:Date,
    studentname:String
    
    
})

const Bookmodel=mongoose.model('book',schema);

module.exports=Bookmodel;