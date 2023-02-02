const tags = document.querySelectorAll('.tag');
const fadeSections = document.querySelectorAll('.scrollFade');
const slideUp = document.querySelectorAll('.slideUp');

// Removes activated animation classes if user JS is enabled
tags.forEach((tag) => {
    tag.classList.remove('tagActive');
});

fadeSections.forEach((section) => {
    section.classList.remove('fadeActive');
});

slideUp.forEach((slide) => {
    slide.classList.remove('slideActive');
});


// When user scrolls, tag will come into view if in view, hides if out of view
const tagObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tagActive');
            return;
        };
        entry.target.classList.remove('tagActive');
    });
});

// When user scrolls, elements fade in and stay in view
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeActive');
            fadeObserver.unobserve(entry.target);
        };
    });
});

// When user scrolls, strength categories slide into place

const slideObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slideActive');
            fadeObserver.unobserve(entry.target);
        };
    });
});


tags.forEach((tag) => {
    tagObserver.observe(tag);
});

fadeSections.forEach((section) => {
    fadeObserver.observe(section);
});

slideUp.forEach((slide) => {
    slideObserver.observe(slide);
});

const checkBoxes = document.querySelectorAll('.display_cat');

// When a dropdown is clicked or pressed in STRENGTHS checkbox is marked as checked and expanded
checkBoxes.forEach((box) => {
    box.addEventListener('click', ariaSwitchOne);
    box.addEventListener('click', ariaSwitchTwo);
});

checkBoxes.forEach((box) => {
    box.addEventListener('keydown', ariaSwitchOne);
    box.addEventListener('keydown', ariaSwitchTwo);
});

function ariaSwitchOne() {
    checkBoxes.forEach((check) => {
        if(check.checked) {
            check.setAttribute('aria-checked', 'true');
            check.setAttribute('aria-expanded', 'true');
        } else {
            check.setAttribute('aria-checked', 'false');
            check.setAttribute('aria-expanded', 'false');
        }
    });
}

function ariaSwitchTwo() {
    checkBoxes.forEach((check) => {
        var strInfo = check.parentNode.querySelector('.str__info');
        if(check.checked) {
            strInfo.setAttribute('aria-hidden', 'false');
        } else {
            strInfo.setAttribute('aria-hidden', 'true');
        }
    })
}