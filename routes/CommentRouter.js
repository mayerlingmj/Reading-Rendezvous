const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

router.get('/', controller.getAllComments)
router.get('/:id', controller.getCommentById)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createComment
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateComment
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteComment
)

module.exports = router
