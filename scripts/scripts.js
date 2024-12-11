// Animation for the counter items to appear on scroll
const counterItems = document.querySelectorAll('.counter-item');
const serviceCards = document.querySelectorAll('.service-card');
const achievementsItems = document.querySelectorAll('.achievement-item');

window.addEventListener('scroll', () => {
    // Counter Items Animation
    counterItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            item.classList.add('animate');
        }
    });

    // Service Cards Animation
    serviceCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            card.classList.add('fade-in');
        }
    });

    // Achievements Animation
    achievementsItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            item.classList.add('fade-in');
        }
    });
});

// Initial Fade-in for sections as you scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade');
});

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add('fade-in');
        }
    });
});

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" S_active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " S_active";
// }

let slideIndex = 0; // Initialize slideIndex
let autoSlideTimeout; // Variable to hold the timeout reference

// Show the first slide and start auto-sliding
showSlides();

// Next/previous controls
function plusSlides(n) {
  clearTimeout(autoSlideTimeout); // Stop the auto-sliding
  showSlides(slideIndex += n, true); // Show the next/previous slide
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(autoSlideTimeout); // Stop the auto-sliding
  showSlides(slideIndex = n, true); // Show the slide corresponding to the thumbnail
}

// Show slides function
function showSlides(n, manual = false) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Handle slideIndex out of range
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  // Reset to the first slide if undefined
  if (!n) slideIndex++;

  // Loop through all slides and dots
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" S_active", "");
  }

  // Display the current slide and update the corresponding dot
  slides[(slideIndex - 1 + slides.length) % slides.length].style.display = "block";
  dots[(slideIndex - 1 + dots.length) % dots.length].className += " S_active";

  manual = false;
  // If not manually controlled, set up auto-sliding
  if (!manual) {
    autoSlideTimeout = setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
}

// Initialize slide index and timeout for testimonials
let slideIndexTestimonials = 0;
let autoSlideTimeoutTestimonials;

// Start the testimonials slideshow
showSlidesTestimonials();

// Next/previous controls for testimonials
function plusSlidesTestimonials(n) {
  clearTimeout(autoSlideTimeoutTestimonials);
  showSlidesTestimonials(slideIndexTestimonials += n, true);
}

// Thumbnail image controls for testimonials
function currentSlideTestimonials(n) {
  clearTimeout(autoSlideTimeoutTestimonials);
  showSlidesTestimonials(slideIndexTestimonials = n, true);
}

// Show slides function for testimonials
function showSlidesTestimonials(n, manual = false) {
  let i;
  let slides = document.getElementsByClassName("mySlides-testimonials");
  let dots = document.getElementsByClassName("dot-testimonials");

  if (n > slides.length) { slideIndexTestimonials = 1; }
  if (n < 1) { slideIndexTestimonials = slides.length; }
  if (!n) slideIndexTestimonials++;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[(slideIndexTestimonials - 1 + slides.length) % slides.length].style.display = "block";
  dots[(slideIndexTestimonials - 1 + dots.length) % dots.length].className += " active";

  if (!manual) {
    autoSlideTimeoutTestimonials = setTimeout(showSlidesTestimonials, 2000);
  }
}
