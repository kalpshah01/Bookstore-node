const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3001;
const db=require('./config/db/db');

const Bookmodel = require('./models/books/bookmange');


const books = [];
db();

server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/view-book', async(req, res) => {
    try{

        let books=await Bookmodel.find();//all records 
        console.log("fetch completed");
        res.render('view-book', { books});
        
    }
    catch(err){
        console.log("Error",err);
    }
});


server.post('/add-book', async(req, res) => {
  

    try{
        const book=Bookmodel({
            bookno:req.body.bookno,
            bookname:req.body.bookname,
            issuedate:req.body.issuedate,
            returndate:req.body.returndate,
            studentname:req.body.studentname
        })
        
       
        
        await book.save();
        console.log(book);
        console.log("book Add successfully");
        res.redirect('/view-book');
    }
    catch(err){
            console.log("err",err);
    }
});


server.get('/edit-book/:id',async (req, res) => {
   
   try{

   
    const {id}=req.params;
console.log(id);
    
    let book= await Bookmodel.findById(id);

    if (!book) {
        return res.redirect('/view-book');
    }
    console.log(book);
    res.render('edit-book', { book });
}
catch(err){
    console.log("err",err);
    res.render('');
}
});

server.get('/view-record/:id', async (req, res) => {
    try{

    

    const id=req.params.id;
    let book=await Bookmodel.findById({_id:id});
    if (!book) {
        return res.redirect('/view-book');
    }

    res.render('view-record', { book} );
}
    catch(err){
    
        console.log("Errr",err);
    }
});
server.post('/update-book/:id', async (req, res) => {
    try{
    
const id=req.params.id;

let book=await Bookmodel.findByIdAndUpdate(id,req.body);
console.log("Update Successfully");
    res.redirect('/view-book');
}
    catch(err){
        console.log("err",err);
    }
});


server.get('/delete-book/:id', async(req, res) => {
  try{
    const id=req.params.id;

let book=await Bookmodel.findByIdAndDelete(id);
console.log("Deleted Successfully");
    res.redirect('/view-book');
}
    catch(err){
        console.log("err",err);
    }
   
});

server.listen(port, () => {
    console.log(`Server started ---> ${port}`);
});