document.addEventListener('DOMContentLoaded', async () => {
  let slideIndex = 0;
  let slides = [];
  let isAnimating = false;

  // Fetch banners from API
  async function fetchBanners() {
    try {
      const response = await fetch('/api/resource/banner');
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  }

  // Render carousel with fetched banners
  function renderCarousel(banners) {
    const carouselContainer = document.querySelector('.carousel');

    // Clear existing content
    carouselContainer.innerHTML = '';

    // Create slides
    banners.forEach((banner, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.innerHTML = `<img src="${banner.image}" alt="${banner.title || 'Slide ' + (index + 1)}" />`;
      carouselContainer.appendChild(slide);

    });

    // Add navigation arrows
    const prevArrow = document.createElement('a');
    prevArrow.className = 'prev';
    prevArrow.innerHTML = '&#10094;';
    prevArrow.onclick = () => changeSlide(-1);
    carouselContainer.appendChild(prevArrow);

    const nextArrow = document.createElement('a');
    nextArrow.className = 'next';
    nextArrow.innerHTML = '&#10095;';
    nextArrow.onclick = () => changeSlide(1);
    carouselContainer.appendChild(nextArrow);

    // Update slides and dots references
    slides = document.querySelectorAll('.carousel-slide');
  }

  function changeSlide(n) {
    // Prevent rapid clicks during animation
    if (isAnimating) return;
    
    isAnimating = true;

    const currentSlideEl = slides[slideIndex];
    
    // Add exit animation to current slide
    currentSlideEl.classList.add('exit');
    currentSlideEl.classList.remove('active');

    // Update slide index
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    // Prepare next slide immediately (no delay)
    const nextSlideEl = slides[slideIndex];
    nextSlideEl.classList.add('active');
    nextSlideEl.classList.remove('exit');

    // Clean up exit animation after it completes
    setTimeout(() => {
      currentSlideEl.classList.remove('exit');
      isAnimating = false;
    }, 500); // Match animation duration (0.5s)
  }

  function currentSlide(n) {
    // Prevent rapid clicks during animation
    if (isAnimating) return;
    
    isAnimating = true;

    const oldSlideEl = slides[slideIndex];
    
    // Add exit animation to current slide
    oldSlideEl.classList.add('exit');
    oldSlideEl.classList.remove('active');

    // Update slide index
    slideIndex = n;

    // Prepare next slide immediately (no delay)
    const nextSlideEl = slides[slideIndex];
    nextSlideEl.classList.add('active');
    nextSlideEl.classList.remove('exit');

    // Update dots immediately
    updateDots();

    // Clean up exit animation after it completes
    setTimeout(() => {
      oldSlideEl.classList.remove('exit');
      isAnimating = false;
    }, 500); // Match animation duration (0.5s)
  }

  // Make functions global for onclick handlers
  window.changeSlide = changeSlide;
  window.currentSlide = currentSlide;

  // Fetch banners and initialize carousel
  const banners = await fetchBanners();
  if (banners.length > 0) {
    renderCarousel(banners);

    // Auto slide every 7 seconds
    setInterval(() => {
      changeSlide(1);
    }, 7000);
  } else {
    console.warn('No banners found');
  }
});
