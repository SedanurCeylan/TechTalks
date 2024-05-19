import axios from 'axios';

const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const ImageUpload = async (formData: FormData) => {
    try {
        const file = formData.get('file') as File;

        formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);

        if (!file) {
            throw new Error('image not found to upload');
        }

        const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

        try {
            const response = await axios.post(cloudinaryUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.url;
        } catch (error) {
            console.log('Error uploading to Cloudinary', error);
            throw error;
        }

    } catch (error) {
        console.error('Error in ImageUpload function:', error);
        throw error;
    }
}; 
