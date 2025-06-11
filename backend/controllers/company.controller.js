import { Company } from "../models/company.model.js"
import getDataUri from "../utils/datauri.js"
import cloudinary from '../utils/cloudinary.js'
import path from "path"


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            })
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({
                success: false,
                message: "Company with this name is already registered"
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
        })
        return res.status(201).json({
            success: true,
            company,
            message: "Company registered successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id
        const companies = await Company.find({ userId })

        if (!companies) {
            return res.status(404).json({
                success: false,
                message: "Companies not found."
            })
        }
        return res.status(200).json({
            success: true,
            companies,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Companies not found."
            })
        }
        return res.status(200).json({
            success: true,
            company,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file
        // cloudinary files here...

        const fileUri = getDataUri(file)
        const cloudResponse = cloudinary.uploader.upload(fileUri.content)
        const logo = (await cloudResponse).secure_url
    
    
        const updateData = { name, description, website, location, logo }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })
    
        if(!company) {
            return res.status(404).json({
                success: false,
                message: "company not found."
            })
        }

        company.save()
        
        return res.status(200).json({
            success: true,
            company,
            message: "Company Information updated successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later"
        })
    }

}