const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//database connection
DB = 'mongodb+srv://restfull:mern008@cluster0.mv62e.mongodb.net/microservice?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
    console.log('conncetion succesfull')
}).catch((err)=> console.log('connection failed'))

//require model
require("./models")
const Book = mongoose.model("Book")

//urls
app.get('/', (req, res)=>{
    res.send("This is working");
})

//post books
app.post("/books", (req, res)=>{
    res.send(`Testing our book route ${req.body.title}`)
    let newBook = {
        title : req.body.title,
        author : req.body.author,
        numberPages : req.body.numberPages,
        publisher : req.body.publisher
    }
    //create new book
    var book = new Book(newBook)
    book.save().then(()=>{
        console.log("new book created");
    }).catch((err)=> {
        if(err){ 
            throw err;
        }
    })

    console.log(req.body)
})

//get all books 
app.get("/books", (req, res)=>{
    Book.find().then((books) => {
         console.log(books);
         res.json(books)
    }).catch(err => {
        if(err){ throw err;}
    })
})

//get all books 
app.get("/books/:id", (req, res)=>{
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }else{
            res.sendStatus(404);
        }
         console.log(book);
    }).catch(err => {
        if(err){ throw err;}
    })
})

app.delete("/books/:id",(req, res)=>{
    Book.findOneAndRemove(req.params.id).then(()=>{
        res.send("Book removed with respect");
    }).catch(err=>{
        if(err){  throw err;    }
    })
})



//server running
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
console.log(`Server runing on port ${port}`)
})
