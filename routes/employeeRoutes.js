const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee')
const multer = require('multer');



// gets and displays a login page
router.get('/', async (req, res) => {
    try {
        const employeeDetails = await Employee.find();
        res.render('employeelist', { employees: employeeDetails, title: 'Employee List' })
    } catch (err) {
        res.send('Failed to retrive student details');
    }
})

router.get('/createEmployee', (req, res) => {
    res.render('createEmployee', { title: 'Add Employee' })
})
// image upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })

router.post('/createEmployee', upload.single('imageupload'), (req, res) => {
    const employee = new Employee(req.body);
    employee.imageupload = req.file.path;
    employee.save()
        .then(() => { res.redirect('/employee') })
        .catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
        })
})

router.get('/update/:id', async (req, res) => {
    try {
        const updateEmp = await Employee.findOne({ _id: req.params.id })
        res.render('updateEmployee', { user: updateEmp })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
})

router.post('/update', async (req, res) => {
        try {
            await Employee.findOneAndUpdate({_id:req.query.id}, req.body)
            res.redirect('/employee');
        } catch (err) {
            res.status(404).send("Unable to update item in the database");
        }
    })

router.post('/delete', async (req, res) => {
    try {
        await Employee.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }
})

module.exports = router;