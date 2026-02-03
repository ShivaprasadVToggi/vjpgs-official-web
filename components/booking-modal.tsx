
"use client";

import { useState } from 'react';
import jsPDF from 'jspdf';

interface BookingModalProps {
  pg: {
    name: string;
    price: string;
  };
  onClose: () => void;
}

export default function BookingModal({ pg, onClose }: BookingModalProps) {
  const [name, setName] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    const randomId = `VJ-${Math.floor(1000 + Math.random() * 9000)}`;

    // Header
    doc.setFontSize(20);
    doc.text("VJ-PG's Official Booking Request", 105, 20, { align: 'center' });

    // Unique ID
    doc.setFontSize(26);
    doc.text(`ID: ${randomId}`, 105, 40, { align: 'center' });

    // Details
    doc.setFontSize(12);
    doc.text(`Student Name: ${name}`, 20, 60);
    doc.text(`PG Name: ${pg.name}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);

    // Digital Seal
    doc.setDrawColor(0, 0, 255);
    doc.circle(105, 120, 20);
    doc.setTextColor(0, 0, 255);
    doc.text("Verified VJ-PG", 105, 120, { align: 'center' });

    // Footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Show this pass to the founder for ₹2,000 Discount.", 105, 160, { align: 'center' });

    doc.save("VJ-Booking-Pass.pdf");

    return randomId;
  };

  const handleConfirm = () => {
    const randomId = generatePDF();
    const message = `Hi VJ! I have downloaded my Booking Pass (ID: ${randomId}) for ${pg.name}. My name is ${name}. Please verify.`;
    window.open(`https://wa.me/919743055967?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '400px',
        color: 'black',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#2563eb', fontSize: '1.5rem' }}>Booking Pass</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '1.125rem' }}><strong>PG:</strong> {pg.name}</p>
          <p style={{ fontSize: '1.125rem' }}><strong>Price:</strong> {pg.price}</p>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          onClick={handleConfirm}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.125rem',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Confirm & Download Pass
        </button>
      </div>
    </div>
  );
}
