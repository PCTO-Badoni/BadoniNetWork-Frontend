import React, { useState } from 'react';

const ProfilePicUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="upload-button"
                style={{ display: 'none' }}
            />
            <label htmlFor="upload-button">
                <div
                    style={{
                        height: '200px',
                        width: '200px',
                        borderRadius: '50%',
                        border: '1px solid black',
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                    }}
                />
            </label>
        </div>
    );
};

export default ProfilePicUploader;