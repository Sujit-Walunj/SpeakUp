const cloudinary = require("cloudinary").v2;  // Ensure you're using cloudinary v2

exports.Upload = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";  // Automatically detect the file type

    try {
        // Use the tempFilePath provided by express-fileupload
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;  // Return the result from Cloudinary
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;  // Throw the error to be handled by the caller
    }
};
