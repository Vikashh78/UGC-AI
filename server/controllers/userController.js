import * as Sentry from '@sentry/node'
import { prisma } from '../configs/prisma.js'

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

        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        return res.status(200).json({
            success: true,
            credits: user?.credits
        })

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
        const { userId } = req.auth()

        const projects = await prisma.project.findMany({
            where: { id: userId },
            orderBy: { createdAt: 'desc'}
        })

        return res.status(200).json({
            success: true,
            projects: projects
        })

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
        const { userId } = req.auth()
        const { projectId } = req.params 

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        })

        if(!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }

        return res.status(200).json({
            success: true,
            project: project
        })

    } catch (error) {
        Sentry.captureException(error)
        res.status(500).json({
            success: false,
            message: error.code || error.message
        })
    }
}

// Publish / Unpublish project
const toggleProjectPublic = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { projectId } = req.params

        const project = await prisma.project.findUnique({
            where: { id: projectId, userId }
        })

        if(!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }

        if(!project?.generatedImage && !project?.generatedVideo) {
            return res.status(404).json({
                success: false,
                message: 'Image or video not generated'
            })
        }

        await prisma.project.update({
            where: { id: projectId },
            data: { isPublished: !project.isPublished }
        })

        return res.status(200).json({
            success: true,
            isPublished: !project.isPublished
        })

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
    toggleProjectPublic
}