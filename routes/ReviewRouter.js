const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

router.get('/', controller.getReviewsByBook)
router.get('/:id', controller.getReviewsByUser)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createReview
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateReview
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteReview
)

module.exports = router
