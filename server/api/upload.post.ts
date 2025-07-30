import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file provided'
      })
    }

    const fileData = formData.find(item => item.name === 'file')
    const typeData = formData.find(item => item.name === 'type')
    
    if (!fileData || !fileData.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file data found'
      })
    }

    const fileType = typeData?.data?.toString() || 'general'
    
    // Validate file type based on upload type
    const filename = fileData.filename || 'unknown'
    const fileExtension = filename.toLowerCase().split('.').pop() || ''
    
    if (fileType === 'pdf') {
      if (!['pdf'].includes(fileExtension)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Only PDF files are allowed'
        })
      }
    } else if (fileType === 'images') {
      if (!['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Only image files (JPG, PNG, GIF, WebP) are allowed'
        })
      }
    } else {
      // Default to images for backward compatibility
      if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(fileExtension)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Only image and PDF files are allowed'  
        })
      }
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', fileType)
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const newFilename = `${timestamp}_${sanitizedFilename}`
    const filePath = join(uploadsDir, newFilename)

    // Write file to disk
    await writeFile(filePath, fileData.data)

    // Return public URL
    const publicUrl = `/uploads/${fileType}/${newFilename}`

    return {
      success: true,
      url: publicUrl,
      filename: newFilename,
      size: fileData.data.length
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file'
    })
  }
})