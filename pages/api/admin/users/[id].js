import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { deleteUser, getUser, updateProfile, updateUser } from "@/backend/controllers/authController";


const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUser);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUser);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser);


export default handler;