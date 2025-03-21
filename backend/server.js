const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

// Helper function to create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Route for pricing form submission
app.post('/submit-pricing-form', async (req, res) => {
  try {
    // Extract form data
    const { name, email, company, phone, service, message } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required fields' 
      });
    }
    
    // Set up email transporter
    const transporter = createTransporter();
    
    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Pricing Request from ${name}`,
      html: `
        <h2>New Pricing Request Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Interested In:</strong> ${service || 'Not provided'}</p>
        <p><strong>Message:</strong><br>${message || 'Not provided'}</p>
        <p><em>This request was submitted on ${new Date().toLocaleString()}</em></p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Your pricing request has been sent successfully!'
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error processing your request. Please try again later.'
    });
  }
});

// Route for contact page form submission
app.post('/submit-contact-form', async (req, res) => {
  try {
    // Extract form data - adjust fields as needed for your contact form
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }
    
    // Set up email transporter
    const transporter = createTransporter();
    
    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Contact Form: ${subject || 'New Message'} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p><em>This message was submitted on ${new Date().toLocaleString()}</em></p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error processing your request. Please try again later.'
    });
  }
});

// Simple test route
app.get('/', (req, res) => {
  res.send('Form processing server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});