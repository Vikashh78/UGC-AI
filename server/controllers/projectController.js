import * as Sentry from '@sentry/node'

// Create project
const createProject = async (req, res) => {
    try {
        
    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Create video
const createVideo = async (req, res) => {
    try {
        
    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get all published project
const getAllPublishedProjects = async (req, res) => {
    try {
        
    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Delete project
const deleteProject = async (req, res) => {
    try {
        
    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    createProject,
    createVideo,
    getAllPublishedProjects,
    deleteProject
}