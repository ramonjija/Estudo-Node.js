const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => { 
        console.log('Connected to mongo-exercises database');
    })
    .catch(err => {
        console.error('An Error occurred', err)
    });

//Defining schema

const courseSchema = mongoose.Schema({
    author: String,
    name: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});


const Course = mongoose.model('Course', courseSchema);

async function getPublishedCourses() {
    return await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1})
}

async function run() {
    console.log('Attempting to retrieve the courses from database...');
    const courses = await getPublishedCourses();
    console.log(courses);
}

run();