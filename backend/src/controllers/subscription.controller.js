import Subscription from "../models/subscriptionPlan.model.js";

export const subscripitionPlan = async(req,res)=>{
    try {
        const companyId = req.company.companyId;
        const {employeeLimit, planType, startDate, endDate} = req.body;

        if(!companyId){
        return res.status(400).json({
            success: false,
             message: "companyId is required!!",
        });
        }

        const existingSubscription = await Subscription.findOne({
            $or: [{company: companyId}, {isActive: true}],
          });
      
          if (existingSubscription) {
            return res.status(400).json({
              success: false,
              message: "This company already has an active subscription plan.",
            });
          }

        const subscription = await Subscription.create({
            company:companyId,
            employeeLimit,
            planType,
            startDate,
            endDate,
            isActive: planType === "Free" ? true : false
        });

        if(!subscription){
        return res.status(404).json({
            success: false,
             message: "subscription plan not found!!",
        }); 
        }

        return res.status(200).json({
            success: true,
             message: "subscription plan created",
            subscription
        }); 

    } catch (error) {
    console.error(error?.message || "Error in Subscription Plans controller");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
    }

    
}