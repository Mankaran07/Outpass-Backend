const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const connect = require('./config/db');
const cors = require('cors');
const { createHod } = require('./Hod');
const { createToken } = require('./authentication');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const { name, collegeId, password, course, type } = req.body;
        if (!name || !collegeId || !password || !course || !type) {
            console.log(`name: ${name}, collegeId: ${collegeId}, password: ${password}, course: ${course}, type: ${type}`)
            throw { error: "BAD REQUEST", statusCode: 400 };
        }

        if (type === 'hod') {
            const data = await createHod({ name, collegeId, password, course });
            const token = createToken({ name, collegeId, type, id: data._id });
            return res.status(201).json({
                token: token,
                data: data,
                success: true,
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            error: error,
            success: false,
        })
    }
})




const prepareAndStartServer = () => {

    app.listen(PORT, async () => {
        console.log(`Server Started on Port : ${PORT}`);
        await connect();
    });
}

prepareAndStartServer();