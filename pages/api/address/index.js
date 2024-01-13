import nc from "next-connect"
import dbConnect from "@/backend/config/dbConnect"
import { getAllAddresses, newAddress } from "@/backend/controllers/addressController";
import onError from "@/backend/middlewares/errors"
import { isAuthenticatedUser } from "@/backend/middlewares/auth";


const handler = nc({ onError }); 
dbConnect();

handler.use(isAuthenticatedUser).get(getAllAddresses)
handler.use(isAuthenticatedUser).post(newAddress);


export default handler