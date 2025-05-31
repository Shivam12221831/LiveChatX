const mongoose = require("mongoose");

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {ssl: true, tlsAllowInvalidCertificates: true});
        console.log(`MongoDB Connected to db`);
    } catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectToDB;