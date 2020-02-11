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

//! Routes
// app.get('/getAllUsers', (req, res) => {
//     User.find({}).then(users => res.json(users))
// })

// app.post('/register', (req, res) => {
//     return new Promise((resolve, reject) => {
//         const { name, email, password } = req.body;

//         //validate input
//         if (name.length === 0 || email.length === 0 || password.length === 0) {
//             return res.json({ message: 'All fields must be completed' });
//         }

//         // check if user exists
//         User.findOne({ email }).then(user => {
//             if (user) {
//                 return res.status(403).json({ message: 'User already exists' });
//             }

//             const newUser = new User();
//             const salt = bcrypt.genSaltSync(10);
//             const hash = bcrypt.hashSync(req.body.password, salt);

//             newUser.name = name;
//             newUser.email = email;
//             newUser.password = hash;

//             newUser
//                 .save()
//                 .then(user => {
//                     res.status(200).json({ message: 'User created', user });
//                 })
//                 .catch(err => {
//                     reject(err);
//                 });
//             resolve(user);
//         });
//     });
// });

// app.post('/login', (req, res) => {
//     return new Promise((resolve, reject) => {
//         User.findOne({ email: req.body.email })
//             .then(user => {
//                 bcrypt
//                     .compare(req.body.password, user.password)
//                     .then(user => {
//                         return res.send(
//                             user === true
//                                 ? 'You are now logged in'
//                                 : 'Incorrect credentials'
//                         );
//                     })
//                     .catch(err => {
//                         return res
//                             .status(500)
//                             .json({ message: 'Server Error', err });
//                     });
//             })
//             .catch(err => reject(err));
//     });
// });

// app.put('/update/:id', (req, res) => {
//     return new Promise((resolve, reject) => {
//         User.findById({ _id: req.params.id })
//             .then(user => {
//                 const { name, email } = req.body;

//                 user.name = req.body.name ? req.body.name : user.name;
//                 user.email = req.body.email ? req.body.email : user.email;

//                 user.save()
//                     .then(user => {
//                         return res
//                             .status(200)
//                             .json({ message: 'User Updated', user });
//                     })
//                     .catch(err => reject(err));
//             })
//             .catch(err =>
//                 res.status(500).json({ message: 'Server error', err })
//             );
//     });
// });

// app.delete('/delete/:id', (req, res) => {
//     return new Promise((reject, resolve) => {
//         User.findByIdAndDelete({ _id: req.params.id })
//             .then(user => {
//                 return res.status(200).json({ message: 'User Deleted', user })
//             })
//             .catch(err => res.status(400).json({message: 'No user to delete'}))
//     })
//     .catch(err => res.status(500).json({message: 'Server Error', err}))
// })

app.listen(port, () => {
    console.log(chalk.cyan(`App listening on port ${port}`));
});
