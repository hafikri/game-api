exports.viewDashboard = async (req, res, next) => {
    try {
       return res.status(200).render('dashboard') 
    } catch (error) {
        next(error)
    }
}