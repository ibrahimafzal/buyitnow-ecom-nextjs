import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { myOrders } from "@/backend/controllers/orderController";


const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser).get(myOrders);


export default handler;