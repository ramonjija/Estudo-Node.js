const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() =>{
        console.log('Connected to MongoDB...')
    })
    .catch(err => {
        console.error('Could not connect to mongoDB', err);
    });

const courseSchema = mongoose.Schema({
    name: { 
            type: String, 
            required: true,
            minlength: 5,
            maxlength: 255
            // match: /pattern/
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        require: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200
    },
    category: {
        required: true,
        enum: ['web','mobile','network']
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // name:'Node.JS Course',
        author:'Mosh',
        tags: ['Node.JS', 'Backend'],
        isPublished: true
    });
    try{
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.error(err.message);
    }
}


// Comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to)
// lt (less than)
// lte (lesser than or equal to)
// in
// nin (not in)

//exemples:
// .find({price: { $gte: 10, $lte: 20}})
// .find({price: { $in: [10, 20, 30]}})

//Logical operators
// or
// and

//Regexp
//const courses = await Course
// .find({ author: 'Mosh' , isPublished: true})
//Starts with Mosh
//.find({ author: /^Mosh/})

//Ends with Hamedani
//.find({author: /Hamedani$/i})

//Contains Mosh
//.find({author: /.*Mosh.*/i})

//.limit(10)
//.sort({ name: 1})
//.select({ name: 1, author: 1});
//console.log(courses);

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
    .find({author: 'Mosh', isPublished: true})
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort({ name: 1})
    .select({name: 1, author: 1})
    //.count()

    console.log(courses);
}

//Querying first
async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    course.author = 'Another Author';
    course.isPublished = true;
    const result = await course.save();
    console.log(result);
}
//Document First

async function updateCourseDocumentFirst(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set:{
            author: 'Mosh',
            isPublished: true
        }
    }, 
    {new: true});
    console.log(course);
}

async function deleteCourse(id) {
    // const course = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndRemove(id);

    console.log(course);
}

createCourse();
// updateCourse('5b71a9bc8316d35d50ebbed3');
// updateCourseDocumentFirst('5b71a9bc8316d35d50ebbed3');
//deleteCourse('5b71f0163d3eaa542cab42e1');

