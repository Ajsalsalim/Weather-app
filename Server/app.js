const express = require("express");
const {PrismaClient} = require("@prisma/client");
const bodyparser = require("body-parser");
const cors = require("cors")
const { hashPassword, comparePassword, generateToken } = require('./utils/auth');
const jwt = require("jsonwebtoken");
require("dotenv").config;

const app = express();

const prisma= new PrismaClient();


app.use(bodyparser.json())

const corsOptions = {
    origin: 'http://localhost:5173', // replace with your frontend URL
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));


app.post('/register', async (req, res) => {
    console.log("hello");
    console.log(req.body);
    const {username, email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });
      console.log(user);
      const token = generateToken(user);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed' });
    }
  });

  app.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log(user);
      if (!user || !(await comparePassword(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token = generateToken(user);
      const userid = user.id;
      res.status(200).json({ token,userid });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  app.post("/addfavourite",async(req,res)=>{
    const {thislocation,userid}=req.body;
    try{
      const user = await prisma.user.update({
        where:{id:userid},
        data:{
          cities:{
            push:thislocation
          }
        }
      });
      res.status(201).json({message:"added"})
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'An error occurred while adding the favourite city' });

    }


  })


  app.get('/showfavourite', async (req, res) => {
    const { userid } = req.query;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userid },
        
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving favourite cities:', error);
      res.status(500).json({ error: 'An error occurred while retrieving favourite cities' });
    }
  });



const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})