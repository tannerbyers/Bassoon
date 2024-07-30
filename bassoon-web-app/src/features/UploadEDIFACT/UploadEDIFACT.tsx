// src/components/UploadEDIFACT.tsx
import React, { useState } from 'react';

interface UploadEDIFACTProps {
  onUploadSuccess: (data: any) => void;
}

const UploadEDIFACT: React.FC<UploadEDIFACTProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://your-api-endpoint/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Upload failed.');
      }

      setResponse(JSON.stringify(data, null, 2));
      onUploadSuccess(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponse('Upload failed.');
    }
  };

  return (
    <div>
      <h2>Upload EDIFACT Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadEDIFACT;
