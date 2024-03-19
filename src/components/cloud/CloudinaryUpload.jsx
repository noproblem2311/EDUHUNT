import React, { useState } from "react";

const CloudinaryUpload = ({ onUpload }) => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "tstdfsn5");
    const preset = "tstdfsn5";
    const apiKey = "579496954431158"; // Replace Your_API_Key with your actual Cloudinary API key
    const cloudName = "djnjql4tl"; // Replace Your_Cloud_Name with your actual Cloudinary Cloud Name

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${preset}&api_key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);

    // Pass the URL of the uploaded image to the external handler function
    onUpload(data.secure_url);
  }

  return (
    <div className=" w-[32rem] h-[32rem]">
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>

        {imageSrc && !uploadData && (
          <>
            <div style={{ maxWidth: "30%", maxHeight: "30%" }}>
              <img src={imageSrc} alt="Uploaded" />
            </div>
            <p className="mt-[8rem] ml-[25rem]">
              <button className="bg-[#000] text-[#fff] p-3 rounded">
                DONE
              </button>
            </p>
          </>
        )}

        {/* {uploadData && (
          <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
        )} */}
      </form>
    </div>
  );
};

export default CloudinaryUpload;
