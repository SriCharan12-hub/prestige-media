import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web application',
  });
  
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [contactId, setContactId] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending OTP...');
    try {
      const response = await fetch('http://localhost:8000/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        setContactId(data.data.contactId);
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage('An error occurred while submitting.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('Verifying...');
    try {
      const response = await fetch('http://localhost:8000/api/contact/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp, contactId }),
      });
      const data = await response.json();
      if (data.success) {
        setIsVerified(true);
        setMessage('Your email has been verified and your inquiry submitted successfully!');
      } else {
        setMessage(data.message || 'Invalid or expired OTP');
      }
    } catch (error) {
      setMessage('An error occurred during verification.');
    }
  };

  const services = [
    'web application',
    'branding',
    'content creation',
    'video editing',
    'automation',
  ];

  if (isVerified) {
    return (
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2>Thank You!</h2>
        <p style={{ color: 'green' }}>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      {message && <p style={{ color: 'blue', marginBottom: '10px' }}>{message}</p>}
      
      {!isOtpSent ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
          </label>
          <label>
            Services:
            <select name="service" value={formData.service} onChange={handleChange} required style={{ width: '100%', padding: '8px' }}>
              {services.map((srv) => (
                <option key={srv} value={srv}>
                  {srv.charAt(0).toUpperCase() + srv.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Submit & Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>An OTP has been sent to <strong>{formData.email}</strong></p>
          <label>
            Enter OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required style={{ width: '100%', padding: '8px' }}/>
          </label>
          <button type="submit" style={{ padding: '10px', background: '#28A745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
