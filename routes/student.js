const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllStudent, createStudent, getSingleStudent, editStudent, storeStudentData, deleteStudent, updateStudent, getAllUnverifiedStudent } = require('../controllers/studentController');


//init router
const router = express.Router();

//configure multer
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/students/'));
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 10000000000) + 1 + '_' + file.originalname);
    }
});
const studentPhotoMulter = multer({
    storage : storage
}).single('student-photo');

//all routes
router.get('/' , getAllStudent);
router.get('/unverified' , getAllUnverifiedStudent);
router.get('/create' , createStudent);
router.post('/create' , studentPhotoMulter, storeStudentData);

router.get('/edit/:id' , editStudent);
router.post('/update/:id', studentPhotoMulter,  updateStudent);

router.get('/:id' , getSingleStudent);
router.get('/delete/:id' , deleteStudent);



//exports router
module.exports = router;