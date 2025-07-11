import React, { useState } from 'react';
import { applyForProduct } from '../api/applications';

export default function Apply() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    city: '',
    postalCode: '',
    productType: 'Loan',
    amount: ''
  });

  const [message, setMessage] = useState(<></>);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await applyForProduct(form);
      setMessage(
        <>
          ✅ Application submitted!<br />
          <a href={res.data.offerUrl} target="_blank" rel="noreferrer">
            Click here to view your offer
          </a>
        </>
      );
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit application');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Apply for a product</h1>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} /><br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
        <input name="city" placeholder="City" onChange={handleChange} /><br /><br />
        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} /><br /><br />
        <select name="productType" onChange={handleChange}>
          <option>Loan</option>
          <option>Flash Credit</option>
          <option>Credit Card</option>
        </select><br /><br />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <div style={{ marginTop: '1rem' }}>{message}</div>
    </div>
  );
}
