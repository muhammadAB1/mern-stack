import express from "express";
import cors from 'cors';
import { db } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

app.get('/', async (req, res) => {
    const data = await db.Login.find()
    res.json(data)
})

app.get('/login', async (req, res) => {
    try {

        const username = req.query.username;
        const password = req.query.password;
        const user = req.query.user
        const data = await db.Login.findOne({ username: username, password: password , user: user});
        if (!data) {
            res.status(404).send('No user found with the provided credentials.');
        } else {
            res.json(data);
        }
    } catch (error) {
        console.log(error)      
    }
})

app.post('/add', async (req, res) => {
    const username = req.body.username;
    try {
      const data = await db.Login.findOne({ username: username });
      if (!data) {
        const account = await db.Login.create({
          username: req.body.username,
          password: req.body.password,
          user: req.body.user
        });
        res.json(account)
      } else {
        res.status(400).send('User already created');
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/allScore', async (req, res) => {
    const data = await db.Score.find();
    res.status(200).json(data);
  })
  
  app.get('/quiz', async (req, res) => {
    try {
      
      const data = await db.Quiz.find({qid: (req.query.qid) });
      res.status(200).json(data);
    } catch (error) {
      console.log(error)  
    }
  })

  app.post('/newScore', async (req, res) => {
    try {
      const data = await db.Score.create({
        username : req.body.username,
        qid: req.body.qid,
        score: req.body.score
      });
      res.json(data)
    } catch (error) {
      console.log(error)
    }
  })

  app.get('/checkQuiz', async (req, res) => {
    try {
      const data = await db.Score.find({
        username: req.query.username,
        qid: req.query.qid
      });
      if (data.length === 0) {
        res.status(400).send('You can give this quiz')
      } else {
        res.status(200).send('you have already given this quiz')
      }
    } catch (error) {
      console.log(error)
    }
  })

app.listen(PORT, ()=> console.log(`Server is listening in http://localhost:${PORT}`));