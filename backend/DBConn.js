const mongoose = require('mongoose');

const DBconnection = async()=>{
try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connect to database successfully");
} catch (error) {
    console.log(error);
    
}
}

module.exports = DBconnection;