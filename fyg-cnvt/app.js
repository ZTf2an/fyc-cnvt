const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

router.get('/test', (req, res) => {
    res.send('Connected to backend server!');
});

router.use('/income', routes.incomeAPI);
router.use('/expense', routes.expanseAPI);

app.use('/api',router)

module.exports = app;