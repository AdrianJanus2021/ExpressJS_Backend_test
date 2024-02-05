class Util
{
    validateLogin = (login, password) =>
{
    return login === "admin" && password === "123"
}
    validateCookie = (req,res)=>
    {
        const cookies=req.cookies;
        if("username" in cookies){
            return cookies.username==="admin"
        }
    }
}
module.exports= new Util();