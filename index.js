const mongoose = require('mongoose');
const Campsite = require('./models/campsite'); //gotta have the model, bruh

const url = 'mongodb://localhost:27017/nucampsite'; //connected to our MongoDBZ server
const connect = mongoose.connect(url, {
    useCreateIndex: true, //i dunno
    useFindAndModify: false, //i really don't know
    useNewUrlParser: true, //i dunno
    useUnifiedTopology: true //i dunno
});

connect.then(() => {

    console.log('Connected correctly to server');

    Campsite.create({ //create is the cooler way to roll, and it creates (get it?) a promise chain
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.findByIdAndUpdate(campsite._id, { //FindByIdAndUpdate does what it says on the tin, but Jeez that is a long name
            $set: { description: 'Updated Test Document' } //specifying what field to update and what we are updating it to
        }, {
            new: true //returns updated document
        });
    })
    .then(campsite => {
        console.log(campsite); //shows updated doc

        campsite.comments.push({ //subdocuments are arrays, so pushing works?
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save(); //epic save with a comment section
    })
    .then(campsite => {
        console.log(campsite);
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