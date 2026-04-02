import { verifyWebhook } from '@clerk/express/webhooks'
import { prismaClient } from '@prisma/client'

const prisma = new prismaClient();

const clerkWebhooks = async (req, res) => {
    try {
        const event = await verifyWebhook(req)

        //Getting data from request
        const { data, type } = event

        // Switch cases for different events
        switch(type) {

            case "user.created": {
                await prisma.user.created({
                    data : {
                        id: data.id,
                        email: data?.email_addresses?.[0]?.email_address,
                        name: data?.first_name + " " + data?.last_name,
                        image: data?.image_url
                    }
                })
                break;
            }

            case "user.updated": {
                await prisma.user.update({
                    where: {
                        id: data.id
                    },
                    data : {
                        email: data?.email_addresses?.[0]?.email_address,
                        name: data?.first_name + " " + data?.last_name,
                        image: data?.image_url
                    }
                })
                break;
            }

            case "user.deleted": {
                await prisma.user.delete({
                    where: {
                        id: data.id
                    }
                })
                break;
            }

            case "paymentAttempt.updated": {
                if((data.charge_type === "recurring" || data.charge_type === "checkout") && data.status === "paid") {
                    const credits = { pro: 80, premium: 240 }
                    const clerkUserId = data?.payer?.user_id
                    const planId = data?.subscription_items?.[0]?.plan?.slug 

                    if(planId !== "pro" && planId !== "premium") {
                        return res.status(400).json({success: false, message: "Invalid plan"})
                    }

                    console.log(planId);
                    
                    await prisma.user.update({
                        where: {
                            id: clerkUserId
                        },
                        data: {
                            credits: { increment: credits[planId] }
                        }
                    })
                }
                break;
            }
        }

        res.status(200).json({
            success: true,
            message: "Webhook Recieved : " + type
        })
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export default clerkWebhooks