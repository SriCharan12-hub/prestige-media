import Contact from '../models/Contact.js';
import sendEmail from '../utils/emailService.js';
import crypto from 'crypto';

// @desc    Submit a contact inquiry and send OTP
// @route   POST /api/contact/submit
// @access  Public
export const submitContactForm = async (req, res) => {
  const { name, email, phone, service } = req.body;

  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP expiration to 10 minutes from now
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // See if the user already has a pending contact request, or update if it exists but is not verified
    let contactInfo = await Contact.findOne({ email, isEmailVerified: false });

    if (contactInfo) {
      // Update existing pending request
      contactInfo.name = name;
      contactInfo.phone = phone;
      contactInfo.service = service;
      contactInfo.otp = otp;
      contactInfo.otpExpires = otpExpires;
      await contactInfo.save();
    } else {
      // Create new contact request
      contactInfo = await Contact.create({
        name,
        email,
        phone,
        service,
        otp,
        otpExpires,
      });
    }

    // Try sending the email
    try {
      const message = `Your verification code is: ${otp}\nThis code will expire in 10 minutes.`;
      
      await sendEmail({
        email: contactInfo.email,
        subject: 'Prestige Media - Please Verify Your Email',
        message,
        html: `<h3>Your verification code is: <strong>${otp}</strong></h3><p>This code will expire in 10 minutes.</p>`,
      });

      res.status(200).json({ success: true, message: 'OTP sent to email', data: { contactId: contactInfo._id, email: contactInfo.email } });
    } catch (error) {
      console.error('Email could not be sent', error);
      // Optional: you can choose to delete the contact request if the email fails
      contactInfo.otp = undefined;
      contactInfo.otpExpires = undefined;
      await contactInfo.save();

      return res.status(500).json({ success: false, message: 'Email could not be sent. Make sure EMAIL_USER and EMAIL_PASS are set in .env' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Verify the email OTP
// @route   POST /api/contact/verify-otp
// @access  Public
export const verifyContactOTP = async (req, res) => {
  const { contactId, email, otp } = req.body;

  try {
    // We can query by contactId or email
    const contactInfo = await Contact.findOne({
      _id: contactId,
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!contactInfo) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Mark as verified
    contactInfo.isEmailVerified = true;
    contactInfo.otp = undefined;
    contactInfo.otpExpires = undefined;
    await contactInfo.save();

    // Send the details to the admin
    try {
      const adminMessage = `
        New Contact Submission:
        Name: ${contactInfo.name}
        Email: ${contactInfo.email}
        Phone: ${contactInfo.phone}
        Service: ${contactInfo.service}
      `;

      await sendEmail({
        email: 'Prestigewavemedia@gmail.com', // Admin email
        subject: 'New Contact Form Submission - Prestige Media',
        message: adminMessage,
        html: `
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${contactInfo.name}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
          <p><strong>Phone:</strong> ${contactInfo.phone}</p>
          <p><strong>Service Requested:</strong> ${contactInfo.service}</p>
        `,
      });
    } catch (adminEmailError) {
      console.error('Failed to send admin notification email:', adminEmailError);
      // We don't necessarily want to fail the user request if the admin email fails, 
      // but it's good to log it.
    }

    res.status(200).json({ success: true, message: 'Email verified and contact request successfully received!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
