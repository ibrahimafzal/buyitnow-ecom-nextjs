import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import { createProductReview } from "@/backend/controllers/productController"
import onError from "@/backend/middlewares/errors"
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

const handler = nc({ onError });  //handler mean router. handler ki jaga router b likh skty hain

dbConnect();

handler.use(isAuthenticatedUser).put(createProductReview);


export default handler;