const errorHandling =  (err, req, res, next)=>{
        const errorStatus = err.statusCode || 500

        res.status(errorStatus).json({
            success: false,
            message: err.message || "somthing wrong"
        })

}

module.exports = errorHandling