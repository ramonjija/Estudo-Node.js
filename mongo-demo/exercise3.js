const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch(err => {
        console.err('An error has occurred', err)
    })

const courseSchema = mongoose.Schema({
    author: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    tags: [ String ],
    name: String,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({isPublished:true})
        .or([
            {price: {$gte: 15} },
            {name: /.*by.*/i}
        ])
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1})
}

async function run() {
    console.log('Attempting to retrieve courses from database');
    const courses = await getCourses();
    console.log(courses);
}

run();