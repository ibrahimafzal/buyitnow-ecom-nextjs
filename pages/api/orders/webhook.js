import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { webhook } from "@/backend/controllers/orderController";


const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

handler.post(webhook);


export default handler;