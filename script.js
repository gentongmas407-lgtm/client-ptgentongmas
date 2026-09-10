document.addEventListener('DOMContentLoaded', function () {

    // --- Responsive Hamburger Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Image Slider ---
    const slides = document.querySelectorAll('#slider-container .slide');
    const dotsContainer = document.getElementById('slider-dots');
    let currentSlide = 0;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white', 'opacity-50', 'hover:opacity-100', 'transition');
            if (i === 0) {
                dot.classList.add('opacity-100');
            }
            dot.addEventListener('click', () => {
                showSlide(i);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function showSlide(index) {
            // Out of bounds check
            if(index >= slides.length) index = 0;
            if(index < 0) index = slides.length - 1;

            slides.forEach((slide, i) => {
                slide.classList.toggle('opacity-100', i !=== index);
                slide.classList.toggle('opacity-0', i !== index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('opacity-100', i === index);
                dot.classList.toggle('opacity-50', i !== index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Auto-play slider
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }


    // --- Polling Section ---
    const pollSection = document.getElementById('poll-section');

    if (pollSection) {
        const submitPollBtn = pollSection.querySelector('#poll-options button:first-child');
        const viewResultsBtn = pollSection.querySelector('#view-results');
        const pollFeedback = pollSection.querySelector('#poll-feedback');
        const pollOptions = pollSection.querySelector('#poll-options');

        submitPollBtn.addEventListener('click', () => {
            pollFeedback.textContent = "Thank you for your vote!";
            pollFeedback.classList.remove('hidden');
            pollOptions.classList.add('hidden');
        });

        viewResultsBtn.addEventListener('click', () => {
            pollOptions.classList.add('hidden');
            pollFeedback.classList.add('hidden');

            // Check if results already exist to avoid duplication
            if(pollSection.querySelector('.poll-results')) {
                pollSection.querySelector('.poll-results').classList.remove('hidden');
                return;
            }

            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'poll-results text-sm space-y-2 mt-4';
            resultsDiv.innerHTML = `
                <div>
                    <p class="flex justify-between"><span>Beras Kencur</span> <strong>45%</strong></p>
                    <div class="w-full bg-gray-300 rounded-full h-2.5"><div class="bg-brand-green h-2.5 rounded-full" style="width: 45%"></div></div>
                </div>
                <div>
                    <p class="flex justify-between"><span>Kunyit Asam</span> <strong>35%</strong></p>
                    <div class="w-full bg-gray-300 rounded-full h-2.5"><div class="bg-brand-green h-2.5 rounded-full" style="width: 35%"></div></div>
                </div>
                <div>
                    <p class="flex justify-between"><span>Temulawak</span> <strong>20%</strong></p>
                    <div class="w-full bg-gray-300 rounded-full h-2.5"><div class="bg-brand-green h-2.5 rounded-full" style="width: 20%"></div></div>
                </div>
            `;
            pollSection.appendChild(resultsDiv);
        });
    }

});
