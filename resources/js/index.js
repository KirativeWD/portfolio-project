// Navigation toggling

const navToggle = document.querySelector('.nav_toggle');
const navItems = document.querySelectorAll('.nav-item');
const primaryNav = document.querySelector('.primary_nav');
const body = document.body;

navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded');

    if (isOpen === 'false') {
        navToggle.setAttribute('aria-expanded', true);
        primaryNav.setAttribute('data-visible', true);
        body.classList.toggle('fixed');

    } else {
        navToggle.setAttribute('aria-expanded', false);
        primaryNav.setAttribute('data-visible', false);
        body.classList.toggle('fixed');
    }
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded');

        if (isOpen == 'true') {
            navToggle.setAttribute('aria-expanded', false);
            primaryNav.setAttribute('data-visible', false);
            body.classList.toggle('fixed');
        }
    });
});

const tags = document.querySelectorAll('.tag');
const fadeSections = document.querySelectorAll('.scrollFade');
const slideUp = document.querySelectorAll('.slideUp');
const headerScroll = document.querySelector('header');

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

headerScroll.classList.remove('headerActive');

// When user scrolls, adds background to header

window.addEventListener("scroll", function() {
    if (window.pageYOffset > 50) {
      headerScroll.classList.add("headerActive");
    } else {
      headerScroll.classList.remove("headerActive");
    }
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

const fadeOptions = {
    threshold: .25
};

// When user scrolls, elements fade in and stay in view
const fadeObserver = new IntersectionObserver(function(entries, fadeObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        };
        entry.target.classList.add('fadeActive');
        fadeObserver.unobserve(entry.target);
    });
}, fadeOptions);

// When user scrolls, strength categories slide into place

const slideObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        };
        entry.target.classList.add('slideActive');
        fadeObserver.unobserve(entry.target);
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

const checkBoxes = document.querySelectorAll('.str_toggle');

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
        var strInfo = check.parentNode.querySelector('.str_info');
        if(check.checked) {
            strInfo.setAttribute('aria-hidden', 'false');
        } else {
            strInfo.setAttribute('aria-hidden', 'true');
        }
    })
}