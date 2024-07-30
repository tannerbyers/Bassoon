// src/App.tsx
import React from 'react';
import UploadEDIFACT from './features/UploadEDIFACT/UploadEDIFACT';
import TradingPartners from './features/TradingPartners/TradingPartners';

const App: React.FC = () => {
  const handleUploadSuccess = (data: any) => {
    console.log('Upload Successful:', data);
  };

  return (
    <div style={{ }}>
      <h1>Bassoon EDI Clearinghouse</h1>
      <UploadEDIFACT onUploadSuccess={handleUploadSuccess} />
      <TradingPartners />
    </div>
  );
};

export default App;
