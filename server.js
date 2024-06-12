const mongoose = require('mongoose');
const Person = require('./person');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://youya:Pachmina@cluster0.de1f1eb.mongodb.net/');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
  }
};

// Create a new person
const createPerson = async () => {
  const newPerson = new Person({
    name: 'Melina',
    age: 27,
    favoriteFoods: ['Ramen', 'Burger']
  });

  try {
    await newPerson.save();
    console.log('Person saved successfully');
  } catch (error) {
    console.error('Error saving the new person:', error);
  }
};

// Array of people to be created
const arrayOfPeople = [
  { name: 'John B', age: 17, favoriteFoods: ['Pizza', 'Burger'] },
  { name: 'Sarah', age: 17, favoriteFoods: ['Salad', 'Pasta'] },
  { name: 'JJ', age: 17, favoriteFoods: ['Steak', 'Ramen'] },
  { name: 'Rafe', age: 21, favoriteFoods: ['Steak', 'Fries'] }
];

// Function to create many people records
const createManyPeople = async () => {
  try {
    await Person.create(arrayOfPeople);
    console.log('People saved successfully!');
  } catch (error) {
    console.error('Error saving people:', error);
  }
};

// Search for a person by name
const findPeopleByName = async () => {
  try {
    const people = await Person.find({name: 'Sarah'});
    console.log('People found by name:', people);
  } catch (error) {
    console.error('Error finding people:', error);
  }
};

// Find one person by a favorite food
const findOneByFood = async () => {
  try {
    const person = await Person.findOne({favoriteFoods: 'Steak'});
    console.log('Person found by favoriteFoods:', person);
  } catch (error) {
    console.error('Error finding person:', error);
  }
};

// Find a person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Person found by id:', person);
  } catch (error) {
    console.error('Error finding person:', error);
  }
};

// Find, edit, then save a person
const findEditThenSave = async (personId) => {
    const foodToAdd = 'hamburger';
    try {
      const person = await Person.findById(personId);
      if (person) {
        person.favoriteFoods.push(foodToAdd);
        const updatedPerson = await person.save();
        console.log('Person updated using find then push:', updatedPerson);
      } else {
        console.log('Person not found');
      }
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

// Find and update a person
const findAndUpdate = async () => {
  const ageToSet = 20;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: 'John B'},
      { age: ageToSet },
      { new: true }
    );
    console.log('Person updated with findAndUpdate:', updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
  }
};

// Remove a person by ID
const removeById = async (id) => {
  try {
    const removedPerson = await Person.findOneAndDelete(id);
    console.log('Person removed by id:', removedPerson);
  } catch (error) {
    console.error('Error removing person:', error);
  }
};

// Delete many documents with deleteMany()
const removeManyPeople = async () => {
    const nameToRemove = 'Mary';
    try {
      const result = await Person.deleteMany({ name: nameToRemove });
      console.log('People removed:', result);
    } catch (error) {
      console.error('Error removing people:', error);
    }
  };
  
  // Chain search query helpers to narrow search results
  const queryChain = async () => {
    const foodToSearch = 'Steak';
    try {
      const people = await Person.find({ favoriteFoods: foodToSearch })
        .sort('name')
        .limit(2)
        .select('-age');
      console.log('People found:', people);
    } catch (error) {
      console.error('Error finding people:', error);
    }finally{
        mongoose.connection.close();
    }
  };  

// Functions to run by selected order
const run = async () => {
  await connectDB();
  await createPerson();
  await createManyPeople();
  await findPeopleByName('Sarah');
  await findOneByFood('Burger');
  await findPersonById({ _id:("666a08340e8cbca92a122873") });
  await findEditThenSave({ _id:("666a08340e8cbca92a122873") });
  await findAndUpdate('John B');
  await removeById({ _id:("666a08340e8cbca92a122873") });
  await removeManyPeople();
  await queryChain();
};

run();
