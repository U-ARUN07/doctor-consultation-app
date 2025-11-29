require('dotenv').config();
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

const express = require('express')
const mongoose = require('mongoose');
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')

require('./config/passport')
const passportLib = require('passport');

const response = require('./middleware/response');

const app = express();

//helmet is a security middleware for Express 
//It helps protect your app by settings various HTTP headers
app.use(helmet());
app.use(compression());

//morgan is an HTTP request logger middleware
app.use(morgan('dev'))

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            return callback(null, true);
        }

        // For development, if allowedOrigins is not set (defaulted to localhost list), 
        // we can be strict or lenient. Let's stick to the list.
        // But to be safe for the user's random port, let's just allow it if it's localhost
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
            return callback(null, true);
        }

        var msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//used response
app.use(response);


//Initialize passport
app.use(passportLib.initialize());

//Mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/doctor', require('./routes/doctor'))
app.use('/api/patient', require('./routes/patient'))
app.use('/api/appointment', require('./routes/appointment'))
app.use('/api/payment', require('./routes/payment'))

app.get('/health', (req, res) => res.ok({ time: new Date().toISOString() }, 'OK'))


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));