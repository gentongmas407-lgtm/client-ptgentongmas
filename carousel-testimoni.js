let currentTestiSlide = 0;
const totalSlides = 3;
const carousel = document.getElementById('testimonial-carousel');
const dotsContainer = carousel.nextElementSibling;
const dots = dotsContainer.querySelectorAll('button');

// Update slide position dan dot
function setTestimonialSlide(index) {
    currentTestiSlide = index % totalSlides;
    carousel.style.transform = `translateX(-${currentTestiSlide * 100}%)`;

    dots.forEach((btn, i) => {
        btn.classList.toggle('bg-brand-green', i === currentTestiSlide);
        btn.classList.toggle('bg-gray-300', i !== currentTestiSlide);
    });
}

// Auto-slide looping
setInterval(() => {
    currentTestiSlide = (currentTestiSlide + 1) % totalSlides;
    setTestimonialSlide(currentTestiSlide);
}, 3000);

// Swipe support
let startX = 0;
let endX = 0;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (diff > 50) {
        // swipe left
        currentTestiSlide = (currentTestiSlide + 1) % totalSlides;
        setTestimonialSlide(currentTestiSlide);
    } else if (diff < -50) {
        // swipe right
        currentTestiSlide = (currentTestiSlide - 1 + totalSlides) % totalSlides;
        setTestimonialSlide(currentTestiSlide);
    }
});