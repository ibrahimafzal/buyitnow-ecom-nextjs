import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { deleteOrder, getOrder, updateOrder } from "@/backend/controllers/orderController";


const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteOrder);


export default handler;