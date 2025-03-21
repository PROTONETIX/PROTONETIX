# Protonetix Private Limited - Temporary Website

This repository contains all the necessary files to quickly set up and deploy a temporary website for Protonetix Private Limited using pure HTML, CSS, and JavaScript.

## Project Structure

```
protonetix-website/
├── index.html                 # Main HTML file
├── css/
│   ├── styles.css             # Main stylesheet
│   └── animations.css         # Animation-specific styles
├── js/
│   ├── main.js                # Main JavaScript functionality
│   └── animations.js          # Animation-specific scripts
├── assets/
│   ├── logo.svg               # Company logo (regular)
│   ├── logo-white.svg         # Company logo (white for footer)
│   ├── favicon.ico            # Site favicon
│   ├── hero-image.png         # Hero section image
│   ├── about-image.jpg        # About section image
│   ├── og-image.jpg           # Open Graph preview image
│   ├── testimonial-1.jpg      # Testimonial author image
│   ├── testimonial-2.jpg      # Testimonial author image
│   └── testimonial-3.jpg      # Testimonial author image
└── README.md                  # This file
```

## Implementation Steps

1. **Create the folder structure:**
   - Create the main folder `protonetix-website`
   - Inside it, create the subfolders: `css`, `js`, and `assets`

2. **Copy the files:**
   - Place all HTML files in the root directory
   - Place CSS files in the `css` folder
   - Place JavaScript files in the `js` folder

3. **Prepare assets:**
   - You can use the provided SVG logo or create your own
   - Find suitable images for hero section, about section, and testimonials
   - Create a favicon (you can use a simplified version of your logo)

4. **Test locally:**
   - Open the `index.html` file in a web browser to ensure everything works correctly
   - Test responsiveness by resizing your browser window

5. **Deployment Options:**

   **For Raspberry Pi hosting:**
   
   - Install a web server like Apache or Nginx on your Raspberry Pi
   - Copy the entire website directory to the appropriate web server directory
   - Configure the server to serve the website files
   - Set up SSL using Let's Encrypt for HTTPS support
   - Configure your domain through GoDaddy to point to your Raspberry Pi's IP address

   **Quick deployment alternatives:**
   
   - GitHub Pages: Push your website to a GitHub repository and enable GitHub Pages
   - Netlify: Sign up for a free account, drag and drop your website folder
   - Vercel: Create an account and deploy directly from your GitHub repository

## Customization

- **Colors:** Edit the CSS variables in `styles.css` to match your brand colors
- **Content:** Update the text content in `index.html` to reflect your services and information
- **Images:** Replace the placeholder images in the `assets` folder with your own
- **Contact details:** Update the contact information in the contact section and footer

## Future Improvements for Next.js Version

This temporary website provides a solid foundation for your future Next.js implementation. When you're ready to migrate to Next.js (in 2-3 days), consider:

1. Converting HTML components to React components
2. Setting up TypeScript for enhanced type safety
3. Implementing server-side rendering for improved SEO
4. Creating a custom CMS solution as specified in requirements
5. Adding advanced security measures

## Need Help?

If you need assistance with implementation or have any questions, feel free to reach out.

---

© 2025 Protonetix Private Limited. All rights reserved.
