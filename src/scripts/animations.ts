import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGsapAnimations(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Reveal all elements immediately
    document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-stagger-child').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  // 1. Hero Entry Animations
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
  
  if (document.querySelector('.hero-eyebrow')) {
    heroTl.fromTo('.hero-eyebrow', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
  }
  
  if (document.querySelector('.hero-headline')) {
    heroTl.fromTo('.hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
  }
  
  if (document.querySelector('.hero-subcopy')) {
    heroTl.fromTo('.hero-subcopy', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
  }
  
  if (document.querySelector('.hero-cta-group')) {
    heroTl.fromTo('.hero-cta-group', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }

  if (document.querySelector('.hero-visual-card')) {
    heroTl.fromTo('.hero-visual-card', { opacity: 0, scale: 0.96, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' }, '-=0.5');
  }

  // 2. Metrics Counter Scramble / Count Up
  document.querySelectorAll<HTMLElement>('[data-counter-target]').forEach((counterEl) => {
    const targetVal = parseFloat(counterEl.dataset.counterTarget || '0');
    const prefix = counterEl.dataset.counterPrefix || '';
    const suffix = counterEl.dataset.counterSuffix || '';
    const decimals = parseInt(counterEl.dataset.counterDecimals || '0', 10);

    const obj = { val: 0 };
    
    ScrollTrigger.create({
      trigger: counterEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            counterEl.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
          }
        });
      }
    });
  });

  // 3. Batch Stagger Card Reveals
  ScrollTrigger.batch('.reveal-stagger-child', {
    start: 'top 85%',
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  });

  // 4. Section Headers & General Fade Ups
  document.querySelectorAll<HTMLElement>('.reveal-fade-up').forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // 5. Magnetic Hover Effect for Primary Buttons
  document.querySelectorAll<HTMLElement>('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // 6. Ambient Glow subtle movement on mouse move
  const glowOrbs = document.querySelectorAll<HTMLElement>('.ambient-glow-orb');
  if (glowOrbs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      glowOrbs.forEach((orb, i) => {
        const factor = (i + 1) * 20;
        gsap.to(orb, {
          x: mouseX * factor,
          y: mouseY * factor,
          duration: 1.5,
          ease: 'power1.out'
        });
      });
    });
  }
}
