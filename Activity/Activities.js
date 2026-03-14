// Activity#4

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/labDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(connectionError => console.log('Connection Error:', connectionError));

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true, 
    min: 18, 
    max: 60 
  },
  grade: { 
    type: String, 
    required: true 
  }
});

const Student = mongoose.model('Student', studentSchema);

const newStudentRecord = new Student({
  name: 'Zain',   
  age: 20,         
  grade: 'A'
});

newStudentRecord.save()
  .then(() => console.log('Student saved!'))
  .catch(validationError => console.log('Validation Error:', validationError));


// Activity#5

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/labDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(connectionError => console.log('Connection Error:', connectionError));


const courseSchema = new mongoose.Schema({
  name: String,
  duration: String
});

const Course = mongoose.model('Course', courseSchema);

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
  enrolledCourse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' 
  }
});

const Student = mongoose.model('Student', studentSchema);

const webTechCourse = new Course({
  name: 'web tech',
  duration: '6 months'
});

webTechCourse.save()
  .then(savedCourse => {
    const enrolledStudent = new Student({
      name: 'Zain',
      age: 20,
      grade: 'A',
      enrolledCourse: savedCourse._id
    });
    return enrolledStudent.save();
  })
  .then(savedStudent => {
    console.log('Student saved:', savedStudent);

    return Student.findOne({ name: 'John Doe' })
      .populate('enrolledCourse');
  })
  .then(populatedStudent => {
    console.log('Student with populated course:', populatedStudent);
  })
  .catch(dbError => console.log('Error:', dbError));


// Activity#6

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/uni')
  .then(() => console.log('Connected to MongoDB'))
  .catch(connectionError => console.error('Cannot connect', connectionError));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', studentSchema);

const newStudentRecord = new Student({
  name: 'Zain',
  age: 90,
  grade: 'B'
});

newStudentRecord.save()
  .then(() => console.log('Student saved'))
  .catch(saveError => console.log('Error', saveError));

const studentList = [
  { name: 'Zain', age: 21, grade: 'B' },
  { name: 'Adeel', age: 22, grade: 'C' },
  { name: 'Rizwan', age: 23, grade: 'B' }
];

Student.insertMany(studentList)
  .then(() => console.log('Students saved'))
  .catch(insertError => console.log('Error', insertError));

Student.updateMany({ name: 'Rafy' }, { grade: 'A' });

Student.find()
  .then(allStudents => console.log('All students', allStudents))
  .catch(fetchError => console.log('Error', fetchError));

Student.findByIdAndDelete();
