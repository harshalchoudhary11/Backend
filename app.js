const express = require('express');
const bodyParser = require('body-parser');
const { initSocket } = require('./utils/socket');
const login = require('./routes/authRoutes');
const conversation = require('./routes/conversationRoutes');
const cors = require('cors'); // Import cors
const http = require('http');
const app = express();
const server = http.createServer(app);
const { connectToPostgres } = require('./config/dbConnect');
const ip = require('ip');
const dotenv = require('dotenv');
dotenv.config();


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// routes
app.use('/auth', login);
app.use('/conversation', conversation);

// socket io
initSocket(server);

const startServer = async () => {
    const port = process.env.PORT || 8000;
    const host = ip.address();
    server.listen(port, host, async () => {
        console.log(`http://${host}:${port}`);
        // await connectToPostgres();
    });
};
startServer();


