// ===== Галерея з модальним вікном =====
const galleryImages = document.querySelectorAll('.gallery img');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let currentImageIndex = 0;

function openModal(index) {
    currentImageIndex = index;
    modalImage.src = galleryImages[index].src;
    modal.classList.add('show');
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hidden');
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openModal(currentImageIndex);
}

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

modal.addEventListener('click', closeModal);

leftBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    prevImage();
});

rightBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    nextImage();
});

document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('show')) {
        if (event.key === 'ArrowLeft') prevImage();
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'Escape') closeModal();
    }
});

// ===== Слайдер =====
const slider = document.querySelector('.slider-container');
const sliderItems = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

const updateSliderPosition = () => {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
};

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? sliderItems.length - 1 : currentIndex - 1;
    updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === sliderItems.length - 1) ? 0 : currentIndex + 1;
    updateSliderPosition();
});

// ===== Коментарі =====
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');
const addCommentBtn = document.getElementById('addCommentBtn');

const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentList.innerHTML = '';
    comments.forEach((comment) => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);
    });
};

addCommentBtn.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = '';
        loadComments();
    }
});

window.addEventListener('load', loadComments);

// ===== Плаваюча кнопка для повернення до шапки =====
const scrollToTopBtn = document.getElementById('scrollToTop');
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
