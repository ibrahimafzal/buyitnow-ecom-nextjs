import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import { deleteAddress, updateAddress, getAddress } from "@/backend/controllers/addressController";
import onError from "@/backend/middlewares/errors"
import { isAuthenticatedUser } from "@/backend/middlewares/auth";


const handler = nc({ onError });  

dbConnect();

handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);
handler.use(isAuthenticatedUser).get(getAddress)


export default handler