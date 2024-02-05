const cookieParser = require("cookie-parser")
const express = require('express')
const app = express()
const port = 3000
const ejs = require("ejs")

const UserRouter = require("./routers/UserRouter");
const IndexRouter = require("./routers/indexrouter");

app.set('view engine', 'ejs')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.use("/", IndexRouter);
app.use("/users", UserRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use((req, res, next) => {
    res.status(404);
    res.send('<h3>Not found on the server</h3>');
});