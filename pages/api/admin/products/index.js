import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import onError from "@/backend/middlewares/errors"
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createNewProduct } from "@/backend/controllers/productController";


const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(createNewProduct);


export default handler;