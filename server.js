const express = require("express");
var app=  express();
const PORT = 3000;
// const FormData = require('form-data');

app.use(express.json());
app.use(express.static('public'))
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const path = require("path")

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
let addressBookArray = [];


// the below is just to ensure that the server is working.
app.get('/heartbeat', (req, resp) => {
    resp.json({
        "is": "working"
    })
});

app.get("/", (req, res) => {
    res.render('landing', { addressBookArray});
    // show landing page with contact form
})
// this is to allow the user to add to do list items to the empty array
app.post('/add-contact', function (req, res) {
    console.log(req.body);
    addressBookArray.push(req.body)
    res.send({
        message: 'Contact added!',
        user: req.body
    })
});

app.delete('/delete-contact', (req,res) =>{
    const id= req.body.id;
    const userToDelete = addressBookArray[id];
    console.log("User to delete", userToDelete)
    addressBookArray.splice(id, 1);
    // the 2nd parameter tells you how to delete . for this example deleting 1 at a time!
    console.log(addressBookArray)
    res.send({
        message: "Contact successfully deleted",
        user: userToDelete
    })
})

app.get('/address-book', (req,res) =>{
    res.json(addressBookArray);
})

// app.put('/update-contact', (req,res) => {



app.listen(PORT, ()=> (console.log(`server is listening at port ${PORT}`)))