import express from 'express';
import { submitContactForm, verifyContactOTP } from '../controllers/contactController.js';

const router = express.Router();

router.post('/submit', submitContactForm);
router.post('/verify-otp', verifyContactOTP);

export default router;
