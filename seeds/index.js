const mongoose = require("mongoose");
const cities = require('./cities');
const{places, descriptors } = require('./seedHelpers')
const CampGround = require('../models/campground')

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () =>{
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

//WILL DELETE EVERYTHING IN THE DATABASE1!!! 
//BE CAREFUL!!!

const seedDB = async() => {
    await CampGround.deleteMany({})
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new CampGround({
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})