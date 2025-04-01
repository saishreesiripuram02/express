const express = require('express');
const userRouter = express.Router();

let adminUser = {
    name : 'sash',
    fullName : "Sai Shree Siripuram",
    role : "Admin"
}

let generalUser = {
    name : 'smende',
    fullName : "Sudheer M",
    role : "Viewer"
}


// // Read One  (GET)
userRouter.get('/current-user', (req, res) => {
    let role = req.query.role; 
    res.status(200).json(role === 'admin' ? adminUser : generalUser);
});


module.exports = userRouter;