const Hod = require('./models/Hod');

async function createHod(user) {

    try {
        const data = await Hod.create(user);
        return data;
    } catch (error) {
        console.log("Something went wrong while creating creating HOD!!");
        throw error;
    }
}



module.exports = {
    createHod,
}