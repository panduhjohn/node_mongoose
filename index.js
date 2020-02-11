const chalk = require('chalk');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

const userRoutes = require('./routes/userRoutes')

require('dotenv').config();

// Connect to mongoose database
// mongoose is a middleware to talk to Mongo(database)
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log(chalk.red(`MongoDB Connected`));
    })
    .catch(error => {
        console.log(`Mongo Error: ${error}`);
    });

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)


app.listen(port, () => {
    console.log(chalk.cyan(`App listening on port ${port}`));
});
