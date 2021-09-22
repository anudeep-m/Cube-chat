import asyncHandler from 'express-async-handler'
import cloudinary from '../utils/cloudinary.js'

// Upload Profile Picture
// route - POST /api/upload
// access - Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    const fileStr = req.body.data
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'cube_chat',
    })
    res.status(200).json({
      imageId: uploadedResponse.public_id,
      imageUrl: uploadedResponse.url,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

// Replace Profile Picture
// route - POST /api/upload
// access - Private
const replaceImage = asyncHandler(async (req, res) => {
  try {
    const fileStr = req.body.data
    const publicId = req.body.imageId
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      public_id: publicId,
      overwrite: true,
    })
    res.status(200).json({
      imageId: uploadedResponse.public_id,
      imageUrl: uploadedResponse.url,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

// Get all Profile Pictures in cube_chat folder on cloudinary
// route - GET /api/upload
// access - Private
const getImages = asyncHandler(async (req, res) => {
  try {
    const { resources } = await cloudinary.v2.search
      .expression('folder:cube_chat')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute()

    const publicIds = resources.map((file) => file.public_id)
    res.send(publicIds)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

export { uploadImage, replaceImage, getImages }
