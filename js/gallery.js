document.addEventListener('DOMContentLoaded', function () {
    fetch('./json/gallery.json')
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.querySelector('.carousel-indicators');
            const carouselInner = document.querySelector('.carousel-inner');

            data.forEach((item, index) => {
                const indicator = document.createElement('li');
                indicator.setAttribute('data-bs-target', '#imageCarousel');
                indicator.setAttribute('data-bs-slide-to', index);

                const imageDiv = document.createElement('div');
                imageDiv.classList.add('carousel-item');

                const img = document.createElement('img');
                img.src = item.image;
                img.classList.add('d-block', 'w-100');
                if (index === 0) {
                    indicator.classList.add('active');
                    imageDiv.classList.add('active');
                }

                carouselIndicators.appendChild(indicator);
                imageDiv.appendChild(img);
                carouselInner.appendChild(imageDiv);
            });
        })
        .catch(error => console.error('Error loading gallery:', error));
});