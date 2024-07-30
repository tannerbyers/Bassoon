import React, { useEffect, useState } from 'react';
import "./TradingPartners.css"
interface TradingPartner {
  name: string;
  id: string;
  version: string;
  type: string;
  status: string;
}

const TradingPartners: React.FC = () => {
  const [partners, setPartners] = useState<TradingPartner[]>([]);
  const [newPartner, setNewPartner] = useState<TradingPartner>({
    name: '',
    id: '',
    version: '',
    type: '',
    status: '',
  });

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch('https://your-api-endpoint/trading-partners');
        if (!res.ok) {
          throw new Error('Failed to fetch trading partners');
        }
        const data = await res.json();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching trading partners:', error);
      }
    };

    fetchPartners();
  }, []);

  const handleAddPartner = async () => {
    try {
      const res = await fetch('https://your-api-endpoint/trading-partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPartner),
      });

      if (!res.ok) {
        throw new Error('Failed to add trading partner');
      }

      const data = await res.json();
      setPartners([...partners, data]);
      setNewPartner({ name: '', id: '', version: '', type: '', status: '' });
    } catch (error) {
      console.error('Error adding trading partner:', error);
    }
  };

  return (
    <div>
      <h2>Trading Partner Section</h2>
      <label>Add Trading Partner</label>
      <div className="add-trading-partner-form">
      <input
        type="text"
        placeholder="Name"
        value={newPartner.name}
        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="ID"
        value={newPartner.id}
        onChange={(e) => setNewPartner({ ...newPartner, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Version"
        value={newPartner.version}
        onChange={(e) => setNewPartner({ ...newPartner, version: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type"
        value={newPartner.type}
        onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={newPartner.status}
        onChange={(e) => setNewPartner({ ...newPartner, status: e.target.value })}
      />
      <button onClick={handleAddPartner}>Add Partner</button>
      </div>
      <h3>Current Trading Partners:</h3>
      <ul>
        {partners.map((partner, index) => (
          <li key={index}>
            {partner.name} (ID: {partner.id}, Version: {partner.version}, Type: {partner.type}, Status: {partner.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradingPartners;
