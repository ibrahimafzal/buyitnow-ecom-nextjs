import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { updatePassword } from "@/backend/controllers/authController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";


const handler = nc({onError});  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser).put(updatePassword);


export default handler;