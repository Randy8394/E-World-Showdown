document.addEventListener('DOMContentLoaded', function () {
    // Sticky NavBar
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('sticky', window.scrollY > 0);
        });
    }

    // Responsive NavBar

    function toggleMenu() {
        const toggleMenu = document.querySelector('.toggleMenu');
        const nav = document.querySelector('.nav');
        toggleMenu.classList.toggle('active');
        nav.classList.toggle('active');
    }
    // expose toggleMenu so inline onclick (in index.html) can call it
    window.toggleMenu = toggleMenu;


    /* Scrolling Animations Effect */

    window.addEventListener('scroll', function() {
        var anime = document.querySelectorAll('.animeX');

        for(var s=0; s<anime.length; s++){
            var windowHeight = window.innerHeight;
            var animeTop = anime[s].getBoundingClientRect().top;
            var animepoint = 150;

            if(animeTop < windowHeight - animepoint){
                anime[s].classList.add('active');
            } else {
                anime[s].classList.remove('active');
            }
        }
    });

    // Filterable Cards
    const lists = document.querySelectorAll('.list');
    const cards = document.querySelectorAll('.card');

    if (lists.length && cards.length) {
        lists.forEach(function (li) {
            li.addEventListener('click', function () {
                // update active class on filter buttons
                lists.forEach(function (l) { l.classList.remove('active'); });
                this.classList.add('active');

                const dataFilter = this.getAttribute('data-filter');

                // show/hide cards based on data-item
                cards.forEach(function (card) {
                    const item = card.getAttribute('data-item');
                    if (dataFilter === 'all' || item === dataFilter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

        // Smooth horizontal wheel scrolling, keyboard navigation, and autoplay carousel for Champions League containers
        const eclScrolls = document.querySelectorAll('.ecl-scroll');
        eclScrolls.forEach(el => {
            // enable smooth horizontal scroll on vertical wheel
            el.addEventListener('wheel', function (e) {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
            }, { passive: false });

            // make the container focusable and allow arrow keys for navigation
            el.tabIndex = 0;
            el.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') {
                    el.scrollBy({ left: el.clientWidth / 2, behavior: 'smooth' });
                } else if (e.key === 'ArrowLeft') {
                    el.scrollBy({ left: -el.clientWidth / 2, behavior: 'smooth' });
                }
            });

            // Autoplay carousel (compute step dynamically to handle unloaded images)
            let autoplayInterval = null;
            function computeStep() {
                const firstItem = el.querySelector('img, .item');
                let w = firstItem ? firstItem.getBoundingClientRect().width : 0;
                if (!w || w < 20) w = Math.round(el.clientWidth / 3) || 160;
                const computed = getComputedStyle(el);
                const gap = parseInt(computed.gap) || 10;
                return Math.round(w + gap);
            }
            function startAutoplay() {
                if (autoplayInterval) return;
                autoplayInterval = setInterval(() => {
                    const step = computeStep();
                    // if at (or very near) the end, reset to start smoothly
                    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
                        el.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        el.scrollBy({ left: step, behavior: 'smooth' });
                    }
                }, 3000);
            }
            function stopAutoplay() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            }

            // Pause on hover / focus, resume on leave / blur
            el.addEventListener('mouseenter', stopAutoplay);
            el.addEventListener('mouseleave', startAutoplay);
            el.addEventListener('focusin', stopAutoplay);
            el.addEventListener('focusout', startAutoplay);

            // start autoplay
            // delay slightly to allow images to layout
            setTimeout(startAutoplay, 200);
        });
        
        // Apply same behavior for league-scroll containers
        const leagueScrolls = document.querySelectorAll('.league-scroll');
        leagueScrolls.forEach(el => {
            // wheel to scroll horizontally
            el.addEventListener('wheel', function (e) {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
            }, { passive: false });

            // keyboard navigation
            el.tabIndex = 0;
            el.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') {
                    el.scrollBy({ left: el.clientWidth / 2, behavior: 'smooth' });
                } else if (e.key === 'ArrowLeft') {
                    el.scrollBy({ left: -el.clientWidth / 2, behavior: 'smooth' });
                }
            });

            // autoplay similar to ecl (dynamic step, handle unloaded images)
            let autoplayInterval = null;
            function computeStepLeague() {
                const firstItem = el.querySelector('img, .item');
                let w = firstItem ? firstItem.getBoundingClientRect().width : 0;
                if (!w || w < 20) w = Math.round(el.clientWidth / 3) || 160;
                const computed = getComputedStyle(el);
                const gap = parseInt(computed.gap) || 10;
                return Math.round(w + gap);
            }
            function startAutoplayLeague() {
                if (autoplayInterval) return;
                // Determine interval based on container index or number of items
                let interval = 3000;
                if (el.dataset.autoplayInterval) {
                    interval = parseInt(el.dataset.autoplayInterval, 10) || interval;
                } else if (leagueScrolls.length > 1) {
                    // assign different timings for each column by index
                    const idx = Array.prototype.indexOf.call(leagueScrolls, el);
                    interval = 3000 + idx * 1000; // 3000ms for first, 4000ms for second, etc.
                }
                autoplayInterval = setInterval(() => {
                    const step = computeStepLeague();
                    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
                        el.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        el.scrollBy({ left: step, behavior: 'smooth' });
                    }
                }, interval);
            }
            function stopAutoplayLeague() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            }

            el.addEventListener('mouseenter', stopAutoplayLeague);
            el.addEventListener('mouseleave', startAutoplayLeague);
            el.addEventListener('focusin', stopAutoplayLeague);
            el.addEventListener('focusout', startAutoplayLeague);

            // delay slightly so images can layout
            setTimeout(startAutoplayLeague, 200);
        });
});
