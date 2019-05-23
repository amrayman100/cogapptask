
const myParser = require("body-parser");
const express = require('express');
const Joi = require('joi');
var path = require("path");
var request =require('request');
const fetch = require('node-fetch');
var cors = require('cors')
var fs = require("fs");
const server = express()
server.use(myParser.json({extended : true}));
server.use(cors())
var campaigns = [];
//import data from "./campaigns.json";
const port = process.env.PORT || 5000;
var contents = fs.readFileSync("campaigns.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);

 campaigns = jsonContent;



  server.get('/len', (req, res) => {

    console.log(campaigns);
    res.send(JSON.stringify(campaigns.length));
  
   
  });

  server.post("/campaigns", async function(req, res) {
    var data = req.body;
    var i = 0;
    await data.forEach(async function (item) {
        
        const { error } = validateCampaign(item); 
        if (error) return res.status(400).send(error.details[0].message);
        var c = item.category;
        if(c==""){
          
            const response = await fetch("https://ngkc0vhbrl.execute-api.eu-west-1.amazonaws.com/api/?url=https://arabic.cnn.com/");
            const json = await response.json();
            c = json.category["name"];
            console.log(c);
        }
        const campaign = {
            
            name: item.name,
            country: item.country,
            budget: item.budget,
            goal: item.goal,
            category:  c
    
          };
          campaigns = campaigns.concat(campaign);
          console.log(campaigns)
          i++;
          
          if(i==req.body.length) res.send(campaigns);
          
    });

    
    
   
   });

   server.get("/getcampaigns", async function(req, res) {

    res.send(campaigns);
   
    
    
   
   });


   server.post("/campaign",  async function(req, res) {
    const { error } = validateCampaign(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    var c = req.body.category;
    console.log(c);
    if(c==""){
          
        const response = await fetch("https://ngkc0vhbrl.execute-api.eu-west-1.amazonaws.com/api/?url=https://arabic.cnn.com/");
        const json = await response.json();
        c = json.category["name"];
     
    }
      const campaign = {
        
        name: req.body.name,
        country: req.body.country,
        budget: req.body.budget,
        goal: req.body.goal,
        category:  c

      };
      campaigns.push(campaign);
      
      if(error)res.send(error.details[0].message);

      res.send("Added Successfully");
    
    
       
      
   });

server.get("/report/", function(req, res) {
    var myMap = new Map();
    var dims = []
    var fields = [];
    for (const key in req.query) {
        if(key=="dims"){
            dims = req.query[key];
        }
        else if(key=="fields"){
            fields = req.query[key];
        }
      }

    if(!dims.length==0)dims = dims.split(",");
    if(!fields.length==0)fields = fields.split(",");
    if(fields==0) fields = ["name","goal","budget" ,"category" ,"country"]
    for (var dim in dims){
        d = dims[dim];
        for(var i = 0 ; i < campaigns.length; i++ ){
            if(myMap.has(campaigns[i][d])){
                var a = myMap.get(campaigns[i][d]);
                a.push(campaigns[i]);
                myMap.set(campaigns[i][d],a);
            }
            else{
                var arr = []
                arr.push(campaigns[i]);
                myMap.set(campaigns[i][d],arr);
            }
        }
    }
    var obj = {};
    myMap.forEach(function(value, key){
      
            obj[key] = value

    
        
    });
   
    var obj2 = obj;
    Object.keys(obj).forEach(key => {   
        for(var i = 0 ; i <obj[key].length; i++){
            var campaign = {};
            var ad = myMap.get(key);
            for(var j = 0 ; j <fields.length ; j++){
                campaign[fields[j]] = ad[i][fields[j]];
           
            }
        
            obj[key][i] = campaign;  
        }
    });
    res.send(obj);
});

function validateCampaign(genre) {
    const schema = {
      name: Joi.string().required(),
      country: Joi.string().required(),
      budget: Joi.number().required(),
      goal: Joi.string().required(),
      category: Joi.string().allow('', null).empty(['', null])
      
    };
   
    return Joi.validate(genre, schema);
  }




server.listen(port);