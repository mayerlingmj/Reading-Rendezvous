const router = require('express').Router()
const controller = require('../controllers/DiscussionController')
const middleware = require('../middleware')

router.get('/', controller.getAllDiscussions)
router.get('/:id', controller.getDiscussionById)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createDiscussion
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateDiscussion
)

module.exports = router
