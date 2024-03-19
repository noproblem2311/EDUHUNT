import React, { useCallback, useState } from "react";
import axios from "axios";

const CloudinaryCV = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "bujjo1i5");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/djnjql4tl/upload?upload_preset=tstdfsn5&api_key=579496954431158",
          formData
        )
        .then((response) => {
          const cvUrl = response.data.secure_url;
          onUpload(cvUrl);
          setSelectedFile(null);
        });
    }
  }, [onUpload, selectedFile]);

  return (
    <div>
      <div className="max-w-md w-full space-y-8 mx-auto mt-8 p-4">
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-gray-700 text-sm font-bold">
            Attach your CV in PDF:
          </label>
          <div className="relative mt-2">
            <label className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded text-sm font-medium">
              Choose a File
              <input
                type="file"
                accept=".pdf"
                className="sr-only"
                onChange={handleFileUpload}
              />
            </label>
            {selectedFile && (
              <div className="mt-2 flex justify-between items-center gap-4">
                <span className="text-gray-700 text-sm">
                  {selectedFile.name}
                </span>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-600 hover:text-red-700"
                >
                  X
                </button>
              </div>
            )}
          </div>
        </div>
        {selectedFile && (
          <button
            onClick={handleUpload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default CloudinaryCV;
