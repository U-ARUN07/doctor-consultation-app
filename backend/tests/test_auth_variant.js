const mongoose = require('mongoose');
require('dotenv').config();

// Try old password with new cluster
const uri = "mongodb+srv://admin:Gq9l270yMVXCJ9zA@cluster1.csav8je.mongodb.net/?appName=cluster1";
console.log('Testing connection with OLD password...');

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected with old password!');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILED: Could not connect with old password.');
        console.error(err.message);
        process.exit(1);
    });
