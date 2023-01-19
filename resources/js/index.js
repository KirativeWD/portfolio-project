const tags = document.querySelectorAll('.tag');
const fadeSections = document.querySelectorAll('.scrollFade');

// Removes the tags and hide scroll fade from the page if user JS is enabled
tags.forEach((tag) => {
    tag.classList.remove('tagActive');
});

fadeSections.forEach((section) => {
    section.classList.remove('fadeActive');
});



const tagObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tagActive');
            return;
        }
        entry.target.classList.remove('tagActive');
    });
});

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeActive');
            fadeObserver.disconnect();
        }
    });
});


tags.forEach((tag) => {
    tagObserver.observe(tag);
});

fadeSections.forEach((section) => {
    fadeObserver.observe(section);
});