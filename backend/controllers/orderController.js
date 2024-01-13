import Stripe from 'stripe';
import getRawBody from "raw-body";
import Order from '../models/order';
import APIFilters from '../utils/APIFilters';
import ErrorHandler from '../utils/errorHandler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const api = process.env.api_path

//  Get All Orders For Admin
export const getOrders = async (req, res) => {
    try {
        const resPerPage = 10;
        const ordersCount = await Order.countDocuments();

        const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);

        const orders = await apiFilters.query.find()
        // .populate("shippingInfo user");
        res.json({
            ordersCount,
            resPerPage,
            orders
        })
    } catch (error) {
        console.log(error)
    }
}

//  Get Order Details For Admin
export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.query.id).populate("user shippingInfo");

        if (!order) {
            next(new ErrorHandler("Oooppss!... No order found", 404))
        }
        res.json({
            order
        })
    } catch (error) {
        console.log(error)
    }
}

//  update order For Admin
export const updateOrder = async (req, res, next) => {
    try {
        let order = await Order.findById(req.query.id)

        if (!order) {
            next(new ErrorHandler("Oooppss!... No order found", 404))
        }

        order = await Order.findByIdAndUpdate(req.query.id, {
            orderStatus: req.body.orderStatus
        })

        res.json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error)
    }
}

//  Delete Order For Admin
export const deleteOrder = async (req, res, next) => {
    try {
        let order = await Order.findById(req.query.id)

        if (!order) {
            next(new ErrorHandler("Oooppss!... No order found", 404))
        }

        order = await Order.findByIdAndDelete(req.query.id)

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}

//  age user ny product purchase nae ki to wo us product pr review nae dy skta
export const canReview = async (req, res, next) => {
    try {
        const productId = req.query.productId

        const orders = await Order.find({
            user: req?.user?._id,
            "orderItems.product": productId
        })

        let canReview = orders.length >= 1 ? true : false

        res.json({ success: true })

    } catch (error) {
        console.log(error)
    }
}

//  Get All User's Orders
export const myOrders = async (req, res) => {
    try {
        const resPerPage = 2;
        const ordersCount = await Order.countDocuments();

        const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);

        const orders = await apiFilters.query
            .find({ user: req.user._id })
            .populate("shippingInfo user");

        res.json({
            ordersCount,
            resPerPage,
            orders
        })
    } catch (error) {
        console.log(error)
    }
}

export const checkoutSession = async (req, res) => {
    const body = req.body

    const line_items = body?.items?.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    metadata: { productId: item.product }
                },
                unit_amount: item.price * 100
            },
            tax_rates: ['txr_1OCNiMAIuvtk3fXCGgmhTyT8'],
            quantity: item.quantity
        }
    })

    const shippingInfo = body?.shippingInfo

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${api}/me/orders?order_success=true`,
        cancel_url: `${api}`,
        customer_email: req?.user?.email,
        client_reference_id: req?.user?.id,
        mode: 'payment',
        metadata: { shippingInfo },
        shipping_options: [
            {
                shipping_rate: 'shr_1OCbw3AIuvtk3fXCKIsaiQYO'
            }
        ],
        line_items
    });

    res.json({
        url: session.url
    })
}

const getCartItems = async (line_items) => {
    return new Promise((resolve, reject) => {
        let cartItems = []

        line_items?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            cartItems.push({
                product: productId,
                name: product.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                image: product.images[0] ? product.images[0] : "/images/default_product.png"
            })

            if (cartItems.length === line_items?.data.length) {
                resolve(cartItems);
            }
        })
    })
}

export const webhook = async (req, res) => {
    try {
        const rawBody = await getRawBody(req)
        const singnature = req.headers['stripe-signature']

        const event = stripe.webhooks.constructEvent(rawBody, singnature, process.env.STRIPE_WEBHOOK_SECRET)

        if (event.type === "checkout.session.completed") {
            // Get the Checkout Session to display the returned order ID
            const session = event.data.object;

            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id)

            const orderItems = await getCartItems(line_items)

            const userId = session.client_reference_id

            const amountPaid = session.amount_total / 100

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status,
                amountPaid,
                taxPaid: session.total_details.amount_tax / 100
            }

            const orderData = {
                user: userId,
                shippingInfo: session.metadata.shippingInfo,
                paymentInfo,
                orderItems
            }


            const order = await Order.create(orderData)

            res.json({ success: true })
        }
    } catch (error) {
        console.log(error)
    }
}