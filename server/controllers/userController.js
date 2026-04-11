import * as Sentry from '@sentry/node'

// Get user credits
const getUserCredits = async (req, res) => {
    try {
        const { userId } = req.auth(); //getting from clerk
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.code || error.message
        })
    }
}

// get user all project
const getAllProjects = async (req, res) => {
    try {
        

    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.code || error.message
        })
    }
}

// Get project by id
const getProjectById = async (req, res) => {
    try {
        

    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.code || error.message
        })
    }
}

// Publish / Unpublish project
const toggleProjectPublish = async (req, res) => {
    try {
        

    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.code || error.message
        })
    }
}

export {
    getUserCredits,
    getAllProjects,
    getProjectById,
    toggleProjectPublish
}