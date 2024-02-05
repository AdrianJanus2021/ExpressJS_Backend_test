const path = require("path");

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Index at: ', new Date().toISOString());
    next();
});


router.get('/', (req, res) => {
    const opts = {time_var: new Date().toISOString()};
    res.render(
        path.resolve(__dirname, "../views/mainview.ejs"),
        opts
    );
});

module.exports = router;