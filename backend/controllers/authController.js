import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import APIFilters from "../utils/APIFilters";

export const registerUser = async (req, res) => {
    const { name, email, password, avatar } = req.body

    const user = await User.create({ name, email, password, avatar })
    res.json({ user })
}


export const updateProfile = async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData)
    res.json({ user })
}

// Update Password
export const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('+password')

        const isPasswordMatched = await bcrypt.compare(req.body.currentPassword, user.password)
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect", 400))
        }

        user.password = req.body.newPassword
        await user.save()
        res.json({ success: true })

    } catch (error) {
        console.log(error)
    }
}

//  Get All Users for admin
export const getUsers = async (req, res) => {
    try {
        const resPerPage = 7;
        const usersCount = await User.countDocuments();

        const apiFilters = new APIFilters(User.find(), req.query).pagination(resPerPage);

        const users = await apiFilters.query

        res.json({
            usersCount,
            resPerPage,
            users
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.query.id)

        if (!user) {
            next(new ErrorHandler("Oooppss!... No user found", 404))
        }

        user = await User.findByIdAndUpdate(req.query.id, req.body.userData)

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}

// get user details (for admin)
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.id)

        if (!user) {
            next(new ErrorHandler("Oooppss!... No user found", 404))
        }

        res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

// Delete User (For Admin)
export const deleteUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.query.id)

        if (!user) {
            next(new ErrorHandler("Oooppss!... No user found", 404))
        }

        user = await User.findByIdAndDelete(req.query.id)

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}