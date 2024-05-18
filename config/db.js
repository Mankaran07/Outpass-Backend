const mongoose = require('mongoose');
const { MONGO_DB_URI } = require('./serverConfig');
const connect = async () => {
    try {
        await mongoose.connect(`${MONGO_DB_URI}/outpass`);
        console.log("DB connected")
    } catch (error) {
        console.log(error);
        console.log("Something went wrong while connecting to db")
    }
}

module.exports = connect;