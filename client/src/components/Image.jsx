// Frontend: ImageUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/up', formData);

      if (response.status === 200) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
