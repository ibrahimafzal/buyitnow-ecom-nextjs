import Address from "../models/address"
import ErrorHandler from "../utils/errorHandler";

// Create new Address
export const newAddress = async (req, res) => {

    req.body.user = req.user._id;
    
    const address = await Address.create(req.body)
    res.json({ address })
}

//  Get All Addresses
export const getAllAddresses = async (req, res) => {
    const addresses = await Address.find({ user: req.user._id })
    res.json({ addresses })
}

// Get Single Address
export const getAddress = async (req, res, next) => {
    const address = await Address.findById(req.query.id)

    if(!address) {
        return next(new ErrorHandler('Address not found', 404))
    }
    res.json({ address })
}

// Update Single Address
export const updateAddress = async (req, res, next) => {
    let address = await Address.findById(req.query.id)
    
    if(!address) {
        return next(new ErrorHandler('Address not found', 404))
    }

    address = await Address.findByIdAndUpdate(req.query.id, req.body)
    
    res.json({ address })
}

// Delete Address
export const deleteAddress = async (req, res, next) => {
    const address = await Address.findByIdAndDelete(req.query.id)

    if(!address) {
        return next(new ErrorHandler('Address not found', 404))
    }

    res.json({success: "Address Deleted Successfully"})
}