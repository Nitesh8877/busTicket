let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/busDb', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParse: true,
});

let ticketModel = require('./database/ticketDetails.js');
let app = express();


app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/filldb', (req, res) => {
    for (let i = 1; i <= 40; i++) {
        let instance = new ticketModel({
            satus: true,
            tickeNo: i
        });
        instance.save((err) => {
            if (err) console.log(err)
        })
    }
    res.json({msg:"data saved!"});
})

app.get('/userDatails/:number',(req,res)=>{
    let num=req.params.number;
    if(num>40 || num<1){
        res.json({Data:"Invalide Input!"});
        return;
    }
    let it=ticketModel.findOne({ticketNo:num});
    it.exec((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json({Data:data.userDetails});
        }
    })
})

app.get('/closed',(req,res)=>{
    let query=ticketModel.find({"status":false}).select("ticketNo");
    query.exec((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json({Data:data});
        }
    })
})

app.get("/open",(req,res)=>{
    let query=ticketModel.find({"status":true}).select("ticketNo");
    query.exec((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json({Data:data});
        }
    })
})

app.put('/updateTicket',(req,res)=>{
    let num=req.body.ticketNo;
    if(num>40 || num<1){
        res.json({data:"Invalid Input"});
    }
    ticketModel.updateOne({"ticketNo":num},req.body,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json({Data:"Data updated"});
        }
    })
})

app.get('/ticketStatus/:number',(req,res)=>{
    let num=req.params.number;
    if(num>40 || num<1){
        res.json({Data:"invalid Input"});
    }
    let query=ticketModel.findOnde({"ticketNo":num}).select("status");
    query.exec((err,data)=>{
        if(err) console.log(err);
        else if(data.status){
            res.json({Data:"open"});
        }else{
            res.json({Data:"Close"});
        }
    })
})

app.put('/reset',(req,res)=>{
    ticketModel.updateMany({"status":true},{"$set":{"status":true,"userDetails":[]}},(err,data)=>{
        if(err) console.log(err);
        else{
            res.json({Data:"data reset"});
        }
    });

})

app.listen(8080,()=>{
    console.log("server is started port number : 8080")
})