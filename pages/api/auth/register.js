import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import { registerUser } from "@/backend/controllers/authController";
import onError from "@/backend/middlewares/errors"


const handler = nc({onError});  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.post(registerUser);


export default handler;