module.exports = {
    getLogin: (req, res) =>{
        res.render('login.ejs');
    },

    getSignUp: (req, res) =>{
        res.render('signup.ejs');
    }
}