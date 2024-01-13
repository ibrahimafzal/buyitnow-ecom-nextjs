import { getServerSession } from "next-auth"
import ErrorHandler from "../utils/errorHandler"
import { authOption } from "@/pages/api/auth/[...nextauth]"

const isAuthenticatedUser = async (req, res, next) => {
    const session = await getServerSession(req, {
        getHeader: (name) => res.headers?.get(name),
        setHeader: (name, value) => res.headers?.set(name, value),
    }, authOption
    )

    if (!session) {
        return next(new ErrorHandler('Login first to access this route', 401))
    }

    req.user = session.user

    next()
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(ErrorHandler(`Role (${req.user.role}) is not allowed to access this resources.`))
        }

        next()
    }
}

export { isAuthenticatedUser, authorizeRoles } 