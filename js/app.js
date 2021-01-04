document.addEventListener("DOMContentLoaded", () => {
    // console.log('DOM fully loaded and parsed');
    /**
     * Coded by Ali Mosabih - FEND - Udacity - 1/2021
     * 
     * Manipulating the DOM exercise.
     * Exercise programmatically builds navigation,
     * scrolls to anchors from navigation,
     * and highlights section in viewport upon scrolling.
     * 
     * Dependencies: None
     * 
     * JS Version: ES2015/ES6
     * 
     * JS Standard: ESlint
     * 
    */

    const body = document.querySelector('body')
    const ul = document.querySelector('ul');
    const btn = document.createElement('button');

    // Build Nav bar function
    function buildNav(numOfSections) {
        ul.classList.add('navbar__menu');
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= numOfSections; i++) {
            const li = document.createElement('li');
            li.innerText = `Section ${i}`;
            li.classList.add('menu__link')
            fragment.appendChild(li);
            // li.innerText(`1`);
        }
        ul.appendChild(fragment);
        ul.children[0].classList.add('menu__link__active');
        ul.children[0].classList.remove('menu__link');
    };
    // Helper function to active ul item when be selected
    function activeSelected(event) {
        const activeItem = document.querySelector('.menu__link__active')
        if (activeItem) {
            activeItem.classList.remove('menu__link__active')
            activeItem.classList.add('menu__link')
        }
        event.target.classList.add('menu__link__active')
        event.target.classList.remove('menu__link')
    }
    // active ul item on click event
    function activeOnClick(lis) {
        for (let i = 0; i <= lis.length; i++) {
            if (lis[i]) {
                lis[i].addEventListener('click', activeSelected);
            }
        }
    }
    // Scroll to matched section when ul item was pressed
    function scrollOnClick(lis) {
        for (let i = 0; i <= lis.length; i++) {
            if (lis[i]) {
                lis[i].addEventListener('click', () => {
                    let elem = document.querySelector(`#section${i + 1}`);
                    let rect = elem.getBoundingClientRect();
                    // console.log(rect);
                    document.querySelector(`#section${i + 1}`).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        }
    }
    // Helper function to check is the section in the view or not
    function isIntoView(el) {
        var rect = el.getBoundingClientRect();
        var elementTop = rect.top;
        var elementBottom = rect.bottom;
        var isVisible = (elementTop >= -250) && (elementBottom <= window.innerHeight + 250);
        return isVisible;
    }
    // Active the marched section while scrolling
    function activeWhileScroll() {
        // const elm = document.querySelector(`#section5`)
        for (let i = 1; i <= ul.children.length; i++) {
            document.addEventListener('scroll', () => {
                const elm = document.querySelector(`#section${i}`);
                if (elm && ul.children[i - 1]) {
                    if (isIntoView(elm)) {
                        // console.log(`#section${i}`)
                        ul.children[i - 1].classList.add('menu__link__active');
                        ul.children[i - 1].classList.remove('menu__link')
                    }
                    else {
                        ul.children[i - 1].classList.remove('menu__link__active');
                        ul.children[i - 1].classList.add('menu__link')
                    }
                }

            })
        }
    }
    // Adding style and functionality to scrollUp Button
    function scrollUpButton() {
        btn.innerHTML = '&#8679;';
        btn.style.display = 'block';
        btn.style.width = '50px';
        btn.style.height = '50px';
        btn.style.bottom = '2rem';
        btn.style.right = '2rem';
        btn.style.fontSize = "2.5rem"
        btn.style.position = 'fixed'
        btn.style.zIndex = '1000'
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        body.appendChild(btn);
    }

    // Functions Calls
    buildNav(5);

    // active()
    activeOnClick(ul.children);

    // Scroll to anchor ID using scrollTO event
    scrollOnClick(ul.children)

    activeWhileScroll();

    scrollUpButton();
})