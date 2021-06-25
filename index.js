const mongoose = require('mongoose');
const Campsite = require('./models/campsite'); //gotta have the model, bruh

const url = 'mongodb://localhost:27017/nucampsite'; //connected to our MongoDBZ server
const connect = mongoose.connect(url, {
    useCreateIndex: true, //i dunno
    useNewUrlParser: true, //i dunno
    useUnifiedTopology: true //i dunno
});

connect.then(() => {

    console.log('Connected correctly to server');

    const newCampsite = new Campsite({ //the 'Campsite' is the model we are working with
        name: 'React Lake Campground',
        description: 'test'
    });

    newCampsite.save()
    .then(campsite => {
        console.log(campsite);
        return Campsite.find(); //will return the array of objects
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany(); //literally undoing all of our work by deleting the new campsite, i think?
    })
    .then(() => {
        return mongoose.connection.close(); //bai bai
    })
    .catch(err => { //uh oh, i made a mistakey wakey
        console.log(err);
        mongoose.connection.close(); 
    });
});