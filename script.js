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
    let currentFilter = 'all';
    let currentCardIndex = 0;

    function showCard(index) {
        let visibleCards = Array.from(cards).filter(card => !card.classList.contains('hide'));
        
        if (visibleCards.length === 0) return;
        
        if (index >= visibleCards.length) {
            currentCardIndex = 0;
        } else if (index < 0) {
            currentCardIndex = visibleCards.length - 1;
        } else {
            currentCardIndex = index;
        }
        
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));
        
        // Show only current visible card
        if (visibleCards[currentCardIndex]) {
            visibleCards[currentCardIndex].classList.add('active');
        }
    }
    
    let autoSlideTimer;

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(function() {
            changeCard(1);
        }, 5000);
    }

    window.changeCard = function(direction) {
        let visibleCards = Array.from(cards).filter(card => !card.classList.contains('hide'));
        let currentIndex = visibleCards.indexOf(document.querySelector('.card.active'));

        if (currentIndex === -1) {
            showCard(0);
        } else {
            showCard(currentIndex + direction);
        }

        resetAutoSlide();
    };

    if (lists.length && cards.length) {
        // Show first card initially
        showCard(0);
        resetAutoSlide();
        
        lists.forEach(function (li) {
            li.addEventListener('click', function () {
                // update active class on filter buttons
                lists.forEach(function (l) { l.classList.remove('active'); });
                this.classList.add('active');

                currentFilter = this.getAttribute('data-filter');

                // show/hide cards based on data-item
                cards.forEach(function (card) {
                    const item = card.getAttribute('data-item');
                    if (currentFilter === 'all' || item === currentFilter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
                
                // Show first visible card after filtering
                showCard(0);
                resetAutoSlide();
            });
        });
    }
});
