

const uploadToImgbb = async (file) => {
    const apiKey = import.meta.env.VITE_imgBB_api_key; // Replace with your Imgbb API key
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            // setImageUrl(data.data.display_url); // Save the uploaded image URL
            // console.log('Image uploaded successfully:', data.data.display_url);
            return data.data.display_url; // Return the uploaded image URL
        } else {
            console.error('Upload failed:', data);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
export { uploadToImgbb };