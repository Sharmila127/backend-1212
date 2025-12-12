const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const amqp = require('amqplib');
require('dotenv').config();

const courseRoutes = require('./src/routes/course');

const app = express();
app.use(bodyParser.json());

// MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Course MongoDB connected'))
  .catch(err => console.error(err));

// Redis
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect().then(() => console.log('Redis connected'));

// RabbitMQ
let channel;
amqp.connect(process.env.RABBITMQ_URL).then(conn => conn.createChannel()).then(ch => {
    channel = ch;
    console.log('RabbitMQ connected');
});

app.use('/course', courseRoutes);

const PORT = process.env.COURSE_PORT || 4100;
app.listen(PORT, () => console.log(`Course service running on port ${PORT}`));
