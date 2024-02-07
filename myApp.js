var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;


require('dotenv').config();
let URI = process.env.MONGO_URI;

MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err, db) {
  if (err) {
    console.log('************** Exception in Connecting Mongo DB ************');
    throw err;
  }
  console.log('************** Mongo DB connected ************');
  db.close();
});

//mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

/*const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/TEST.TESTDB`, {
      useNewUrlParser: true, useUnifiedTopology: true 
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error("Error in connecting Mongo DB ",error.message);
    process.exit(1);
  }
}*/

//console.log('Mango DB Connected');

const { Schema } = mongoose;

const personSchema = new Schema({
  name:{
    type: String,
    required: true
  },
    age: Number,
    favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var personDetails = new Person({name: "UdayaKumar", age: 84, favoriteFoods: ["Rice", "Panner", "Mango"]});
  console.log("Name : ",personDetails);

  personDetails.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  {name: "Del", age: 30, favoriteFoods: ["Chicked65"]},
  {name: "Ram", age: 29, favoriteFoods: ["curd Rice"]},
  {name: "Mohammed", age: 30, favoriteFoods: ["Beef Briyani"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (errror, people) {
    if (errror) return console.log(errror);
    done(null, people);
  });
};

var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'Idly';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPersonValue) => {
      if(err) return console.log(err);
      done(null, updatedPersonValue)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;