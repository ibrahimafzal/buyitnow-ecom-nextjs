import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";

export const createNewProduct = async (req, res) => {
    req.body.user = req.user._id
    const product = await Product.create(req.body);
    res.json({ product })
}

export const getAllProducts = async (req, res) => {
    const resPerPage = 20
    const productCount = await Product.countDocuments()

    const apiFilters = new APIFilters(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFilters.query
    const filteredProductCount = products.length

    apiFilters.pagination(resPerPage)

    products = await apiFilters.query.clone();
    res.json({
        productCount,
        resPerPage,
        filteredProductCount,
        products,
    })
}

export const getOneProduct = async (req, res) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler('The product was not found', 404))
    }
    res.json({ product });
}

export const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler('The product was not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body)

    res.json({ product })

}

export const deleteProduct = async (req, res, next) => {
    const productId = req.query.id;

    let product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('The product was not found', 404))
    }

    product = await Product.findByIdAndDelete(productId)

    res.json({ success: true })
}

// reviews
export const createProductReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user?._id,
        rating: Number(rating),
        comment
    }

    let product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('The product was not found', 404))
    }

    const isReviewed = product?.reviews?.find(
        (r) => {
            r.user.toString() === req.user.id.toString()
        }
    )

    if (isReviewed) {

        product?.reviews.forEach((review) => {
            if (review.user.toString() === req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product?.reviews.push(review)
    }

    product.ratings = product?.reviews?.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product?.save()

    res.json({ success: true })
}