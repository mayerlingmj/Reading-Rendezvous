const router = require('express').Router()
const controller = require('../controllers/BookController')
const middleware = require('../middleware')

router.get('/', controller.getAllBooks)
router.get('/:id', controller.getBookById)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createBook
)
router.put('/:id', middleware.stripToken, middleware.verifyToken)

module.exports = router
