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
});
