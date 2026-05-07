document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Carrossel Nativo Infinito (Sexta da Padaria) ---
    const padariaGrid = document.querySelector('.padaria-grid');
    if (padariaGrid) {
        // Guardamos os itens originais para clonar depois
        const originalCards = Array.from(padariaGrid.querySelectorAll('.card-produto'));

        padariaGrid.addEventListener('scroll', () => {
            // Se o usuário rolou até perto do fim (faltando menos de 100px)
            if (padariaGrid.scrollLeft + padariaGrid.clientWidth >= padariaGrid.scrollWidth - 100) {
                // Adiciona uma nova cópia de todos os itens originais ao final
                originalCards.forEach(card => {
                    padariaGrid.appendChild(card.cloneNode(true));
                });
            }
        });
    }

    // --- 3. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = question.classList.contains('active');

            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherQuestion.classList.remove('active');
                otherAnswer.style.maxHeight = null;
            });

            // Se não estava aberto, abre o atual
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 4. Intersection Observer (Animações ao fazer scroll) ---
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animationType = el.getAttribute('data-scroll');
                const delay = el.getAttribute('data-delay');

                // Tratar delay se houver
                if (delay) {
                    setTimeout(() => {
                        el.classList.add(`animate-${animationType}`);
                    }, parseInt(delay));
                } else {
                    el.classList.add(`animate-${animationType}`);
                }

                // Tratamento especial para stagger
                if (animationType === 'stagger') {
                    const cards = el.parentNode.querySelectorAll('[data-scroll="stagger"]');
                    const index = Array.from(cards).indexOf(el);
                    setTimeout(() => {
                        el.classList.add('animate-fade-up');
                    }, index * 200); // 200ms delay entre cada card
                }

                // Desobserva após animar para não repetir
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15, // Ativa quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    });

    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Animação inicial do Background Hero (Zoom in lento)
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        // Um pequeno timeout para garantir que o CSS carregou e a transição vai rodar
        setTimeout(() => {
            heroBg.classList.add('animate-zoom-in');
        }, 100);
    }
});
