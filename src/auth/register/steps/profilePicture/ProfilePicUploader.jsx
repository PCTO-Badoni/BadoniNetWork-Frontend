import { useState } from "react";
import "./ProfilePicUploaderStyle.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import * as Components from "../../RegisterComponents";
import { usePhoto } from './PhotoContext';

function ProfilePicUploader() {
    const [fileName, setFileName] = useState("Nessuna foto selezionata");
    const { photo, setPhoto } = usePhoto();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            setFileName(files[0].name);
            setPhoto(URL.createObjectURL(files[0]));
        }
    };

    return (
        <main>
            <Components.UploadForm
                onClick={() => document.querySelector(".input-field").click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={({ target: { files } }) => {
                        if (files[0]) {
                            setFileName(files[0].name);
                            setPhoto(URL.createObjectURL(files[0]));
                        }
                    }}
                />

                {photo ? (
                    <img
                        src={photo}
                        width={250}
                        height={250}
                        alt={fileName}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "5px solid rgba(20, 117, 207, 0.5)",
                            marginBottom: "20px",
                        }}
                    />
                ) : (
                    <>
                        <MdCloudUpload color="#1475cf" size={180} />
                    </>
                )}

                <section className="uploaded-row">
                    <AiFillFileImage color="#1475cf" />
                    <span className="upload-content">
            {fileName} -
            <MdDelete
                onClick={() => {
                    setFileName("Nessuna foto selezionata");
                    setPhoto(null);
                }}
            />
          </span>
                </section>
            </Components.UploadForm>
        </main>
    );
}

export default ProfilePicUploader;