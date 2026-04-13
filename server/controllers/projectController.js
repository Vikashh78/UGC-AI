import * as Sentry from '@sentry/node'
import { prisma } from '../configs/prisma.js'
import cloudinary from '../configs/cloudinary.js';

// Create project
const createProject = async (req, res) => {
    
    let tempProjectId;
    const { userId } = req.auth()
    let isCreditDeducted = false

    const { name = 'New Project', aspectRatio, userPrompt, productName, productDescription, targetLength = 5} = req.body;

    const images = req.files;

    if(images.length < 2 || !productName) {
        return res.status(400).json({
            success: false,
            message: 'Please upload at least two images'
        })
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if(!user || user.credits < 5) {
        return res.status(401).json({
            success: false,
            message: 'Insufficient credits'
        })
    } else {
        // Deduct credits for image generation
        await prisma.user.update({
            where: { id: userId },
            data: { credits: {decrement: 5} }
        }).
        then(() => {isCreditDeducted = true})
    }
     
    try {
        //"All images upload in parallel by using [promise.all()], and you get all URLs together after all uploads finish."
        let uploadedImages = await Promise.all( 
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(
                    item.path, 
                    { resource_type: 'image'}
                )
                return result.secure_url
            })
        )

        const project = await prisma.project.create({
            data: {
                name,
                userId,
                productName,
                productDescription,
                userPrompt,
                aspectRatio,
                targetLength: parseInt(targetLength),
                uploadedImages,
                isGenerating: true
            }
        })

        tempProjectId = project.id;

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