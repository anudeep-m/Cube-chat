import express from 'express'
import {
  getImages,
  replaceImage,
  uploadImage,
} from '../controllers/uploadControllers.js'

const router = express.Router()

router.route('/').post(uploadImage)
router.route('/replace').post(replaceImage)
router.route('/').get(getImages)

export default router
