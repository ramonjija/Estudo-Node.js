const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => {
        console.log('Connected to mongodb database')
    })
    .catch(err => {
        console.log('An error has occurred', err)
    })

const courseSchema = mongoose.Schema({
    author: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    tags: [ String ],
    name: String,
    price: Number
});

const Courses = mongoose.model('Course', courseSchema);

async function getAllPublishedCourses1() {
    return await Courses
        .find({isPublished: true, tags: {$in:['backend','frontend']}})
        .sort({price: -1})
        .select({ name: 1, author: 1})
}

async function getAllPublishedCourses2() {
    return await Courses
        .find({isPublished: true})
        .or([{tags:'backend'}, {tags:'frontend'}])
        .sort('-price')
        .select('name author price')
}

async function run() {
    console.log('Attempting to get courses from database...');
    const courses1 = await getAllPublishedCourses1();
    const courses2 = await getAllPublishedCourses2();
    console.log('Using courses1');
    console.log(courses1);
    console.log('Using courses2');
    console.log(courses2);
}

run();
