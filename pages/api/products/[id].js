import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import { getOneProduct } from "@/backend/controllers/productController"
import onError from "@/backend/middlewares/errors"

const handler = nc({onError});    //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.get(getOneProduct);


export default handler;