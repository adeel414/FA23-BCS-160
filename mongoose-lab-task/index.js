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
  .then(savedStudent => console.log('Student saved:', savedStudent))
  .catch(validationError => console.log('Validation Error:', validationError));
