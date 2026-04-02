

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth() //auth from cleckMiddleware
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
                success: false,
                message: error.code || error.message
            })
    }
}