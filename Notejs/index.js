const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/Auth')
const postRouter = require('./routes/Post')


require('dotenv').config()
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/learning_dev');
        console.log('Connect MongoDB successfully !!!');

    } catch (error) {
        console.log('Connect MongoDB fail !!!');
    }
}

connectDB();

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = 5000

app.listen(PORT, () => console.log('Server start PORT: ' + PORT));