import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import expressSession from 'express-session';

import routes from './routes.js';
import cookieParser from 'cookie-parser';
import authMiddleware from './middlewares/authMiddleware.js';
import pageHelpers from './helpers/pageHelpers.js';
import { tempDataMiddleware } from './middlewares/tempDataMiddleware.js';

const app = express();

// Setup Database
const url = 'mongodb://localhost:27017';

try {
    await mongoose.connect(url, {
        dbName: 'movie-magic-sept2025',
    });

    console.log('Successfully connected to DB!');
} catch (err) {
    console.error('Cannot connect to DB, ', err.message);
}

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
       ...pageHelpers,
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Setup static middleware
app.use(express.static('src/public'));

// Parse form data from req
app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

// Use auth middleware
app.use(authMiddleware);

// Express session
app.use(expressSession({
  secret: 'JHiausjhdikasjhd3u7ia78dh73uida3789h7d3a78o3hd783d78a3h87a3h7d8ha38diauhd7i3uhd3',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Add tempData Middleware
app.use(tempDataMiddleware);

// Routes
app.use(routes);

// Start Server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
