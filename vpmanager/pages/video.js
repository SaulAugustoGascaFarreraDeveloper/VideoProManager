import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [videoName, setVideoName] = useState('');

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
    setVideoName(event.target.files[0].name);
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', 'saultest1'); // Reemplaza 'your-upload-preset' con tu propio valor

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/saul115/video/upload', // Reemplaza 'your-cloud-name' con tu propio valor
        formData
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>Video Upload</div>
      <form onSubmit={handleVideoUpload}>
        <div>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          <label>{videoName}</label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default VideoUpload;
