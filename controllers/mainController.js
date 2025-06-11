module.exports = {
    // WIll get the settings page
    getSettings: (req, res) => {
        res.render('settings.ejs')
    },

    getSites: (req, res)=>{
        res.render('sites.ejs')
    }
}