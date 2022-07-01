import { useState } from 'react';

const SoundUpload = () => {
  const [fileInput, setFileInput] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
  };

  return (
    <div>
      <h1>Upload</h1>
      <form>
        <input
          type="file"
          name="audio"
          onChange={handleFileInputChange}
          value={fileInput}
          className="form-Input"
        />
      </form>
      <button className="btn" type="Submit ">
        Submit upload
      </button>
    </div>
  );
};

export default SoundUpload;
