const express = require('express')
const router = express.Router()
const path=require('path')
const Util=require('../util')
const fs = require('fs')


router.use((req, res, next) => {
    console.log('Users at: ', new Date().toISOString())
    next()
})


router.get('/', (req, res) => {
    res.send("users path")
})

router.get("/secret_path", (req, res) => {
    res.send('super secret path')
})

router.post("/login", (req, res) =>
{
    const data =
        {
            login: req.body.login,
            password: req.body.password
        };

    if(Util.validateLogin(data.login, data.password))
    {
        res.cookie("username",data.login);
        res.render(
            path.resolve(__dirname, "../views/loginview.ejs"),
            {name: data.login}
        );
    }
    else
    {
        res.render(
            path.resolve(__dirname, "../views/errorview.ejs")
        );
    }
})
router.get("/login", (req, res) =>
{
    if(Util.validateCookie(req,res)) {
        res.render(
            path.resolve(__dirname, "../views/loginview.ejs"),
            {name: req.cookies.username}

        );
    }
    else{
        res.render(
            path.resolve(__dirname, "../views/errorview.ejs")
        );
    }
})

router.post("/logout", (req, res) =>
{
    res.clearCookie("username");
    res.redirect('/')
})

router.post("/read", (req, res) =>
{
    const file ="files/"+req.body.file+".txt"
    console.log(file)
    fs.readFile(file,(err)=>{
        if (err){
            res.render(
                path.resolve(__dirname, "../views/errorview.ejs")
            );
        }
        else {
            const data = fs.readFileSync(file, 'utf8');
            res.render(
                path.resolve(__dirname, "../views/readview.ejs"),
                {name: req.body.file,content: data}
            );
        }
    })
})

module.exports = router;