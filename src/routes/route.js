const express = require('express')
const { createUser, userLogin } = require('../controllers/userController')
const { createBook, getBooks, getBookById, updateBooks, deleteById } = require('../controllers/bookController')
const { createReview, updateReview, deleteByReviewId } = require("../controllers/reviewController")
const { authentication, authorization } = require('../middlewares/middleware')
const b=require('../middlewares/awsMiddleware')
const router = express.Router()



//_______________________________________________________userAPI'S__________________________________________



router.post('/register', createUser)
router.post('/login', userLogin)



//_______________________________________________________bookAPI'S__________________________________________

router.post('/books', authentication,b.a, createBook)
router.get('/books',getBooks)
router.get("/books/:bookId",getBookById)
router.put("/books/:bookId", authentication, updateBooks)
router.delete("/books/:bookId", authentication, deleteById)



//_______________________________________________________reviewAPI'S__________________________________________

router.post("/books/:bookId/review", createReview)
router.put("/books/:bookId/review/:reviewId", updateReview)
router.delete("/books/:bookId/review/:reviewId", deleteByReviewId)





router.all('/*', function (req, res) {
    res.status(400).send({ msg: "invalid Url request" })
})

module.exports = router