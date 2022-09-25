const path = require('path');
const {readFileSync, writeFileSync} = require('fs');
const sendEmail = require('../utility/sendMail');
const sendMessage = require('../utility/sendSMS');


//show all student
const getAllStudent = (req, res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    const verified = students.filter( data => data.isVetified == true);
    res.render('students/index', {
        student : verified
    });
}

//Unverified student
const getAllUnverifiedStudent = (req, res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    const unverified = students.filter( data => data.isVetified == false);
    res.render('students/unverified', {
        student : unverified
    });
}

//Add student
const createStudent = (req, res) =>{
    res.render('students/create');
}

//store student data
const storeStudentData = (req, res) =>{

    sendEmail(req.body.email, 'Hello Emran');
    sendMessage(req.body.cell, `Hi, ${req.body.name}, Kamon aso?`);
    
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    const {name, email, cell, location, photo} = req.body;
    
    let last_id = 1;
    if(students.length > 0){
        last_id = students[students.length - 1].id + 1;
    }
    students.push({
        id: last_id,
        name : name,
        email : email,
        cell : cell,
        location : location,
        photo : req.file ? req.file.filename : 'avatar.png',
        isVetified : false,
        token : Date.now() + '_' + Math.floor(Math.random() * 1000000)
    });
    writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(students));

    // //redirect to homepage
    res.redirect('/student');
    
}


//Single Student
const getSingleStudent = (req, res) =>{
    const {id} = req.params;
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    const student = students.find( data => data.id == id);
    res.render('students/show', {
        student : student
    });
}

//edit student
const editStudent = (req, res) =>{
    const {id} = req.params;
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    const editData = students.find( data => data.id == id);
    res.render('students/edit', {
        student : editData
    });
}

//delete student
const deleteStudent = (req, res) =>{
  const { id } = req.params;
  const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
  const newStudent = students.filter( data=> data.id != id );

  writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(newStudent));
    
  res.redirect('/student');

}

//update student data
const updateStudent = (req, res) => {

    const {id} = req.params;
    
    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/students.json')));
    
    students[students.findIndex( data => data.id == id)] = {
        ...students[students.findIndex( data => data.id == id)],
        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
        location : req.body.location,
    }
    writeFileSync(path.join(__dirname, '../db/students.json'), JSON.stringify(students));
    res.redirect('/student');
    
}

module.exports = {
    getAllStudent,
    createStudent,
    storeStudentData,
    getSingleStudent,
    editStudent,
    deleteStudent,
    updateStudent,
    getAllUnverifiedStudent
}