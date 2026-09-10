document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Header — show after scrolling past the hero
    const header = document.getElementById('site-header');
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('header-nav');

    if (header) {
        const onScroll = () => {
            const heroHeight = document.getElementById('hero')?.offsetHeight || 400;
            if (window.scrollY > heroHeight * 0.5) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
                if (headerNav) headerNav.classList.remove('open');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (hamburger && headerNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = headerNav.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        });
        headerNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'メニューを開く');
            });
        });
    }

    // 3. FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = null;
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // 5. Form — Netlify Forms via fetch
    const form = document.getElementById('consultation-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            const formData = new URLSearchParams(new FormData(form));

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (response.ok) {
                    if (typeof gtag === 'function') {
                        gtag('event', 'generate_lead', {
                            event_category: 'form',
                            event_label: 'shindan_form'
                        });
                    }
                    form.style.display = 'none';
                    successMsg.style.display = 'block';
                } else {
                    alert('送信に失敗しました。時間をおいて再度お試しください。');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('通信エラーが発生しました。ネットワーク環境をご確認ください。');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
