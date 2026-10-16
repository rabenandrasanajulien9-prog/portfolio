/**
 * PORTFOLIO - RABENANDRASANA JULIEN GABRIEL
 * Main Interactive Scripts & Animations (Top Model Edition)
 * Langue: Français
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. EFFET TAPE-MACHINE (Typing Text en Français - Stable & Fluide)
  // ==========================================================================
  const words = [
    "Développeur Web & Mobile",
    "Étudiant EMIT Informatique",
    "Développeur Angular & Next.js",
    "Concepteur de CFF Manager",
    "Créateur de l'App Snack Bar",
    "Passionné de Physique & Code"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 65;
  const deleteSpeed = 30;
  const pauseTime = 1600;
  const typedTarget = document.getElementById('typed-text');

  function typeEffect() {
    if (!typedTarget) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      nextDelay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      nextDelay = 450;
    }

    setTimeout(typeEffect, nextDelay);
  }

  typeEffect();

  // ==========================================================================
  // 2. CARTE HOLOGRAPHIQUE 3D FLIP (Rehefa kitihina dia mihodina!)
  // ==========================================================================
  const flipCardInner = document.getElementById('flipCardInner');
  const flipTriggers = document.querySelectorAll('.flip-trigger');
  const flipHint = document.getElementById('flipCardHint');

  let isFlipped = false;

  function toggleCardFlip() {
    if (!flipCardInner) return;
    isFlipped = !isFlipped;
    flipCardInner.classList.toggle('is-flipped', isFlipped);
    
    if (flipHint) {
      flipHint.innerHTML = isFlipped 
        ? '<i class="bi bi-arrow-repeat"></i> Cliquez pour voir la face avant'
        : '<i class="bi bi-arrow-repeat"></i> Cliquez pour découvrir les détails secrets 🔄';
    }
  }

  flipTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't trigger flip if clicking direct links
      if (e.target.closest('a')) return;
      toggleCardFlip();
    });
  });

  // 3D Tilt Effect on mouse movement
  const flipWrapper = document.querySelector('.flip-card-wrapper');
  if (flipWrapper && flipCardInner) {
    flipWrapper.addEventListener('mousemove', (e) => {
      const rect = flipCardInner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      const baseRotateY = isFlipped ? 180 : 0;
      flipCardInner.style.transform = `rotateY(${baseRotateY + rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    flipWrapper.addEventListener('mouseleave', () => {
      const baseRotateY = isFlipped ? 180 : 0;
      flipCardInner.style.transform = `rotateY(${baseRotateY}deg) rotateX(0deg) scale3d(1, 1, 1)`;
    });
  }

  // ==========================================================================
  // 3. EFFET NAVBAR AU SCROLL & DOCK FLOTTANT DANSANT (MONTER / DESCENDRE)
  // ==========================================================================
  const navbar = document.querySelector('.custom-navbar');
  const btnScrollUp = document.getElementById('btnScrollUp');
  const btnScrollDown = document.getElementById('btnScrollDown');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Gestion du menu burger mobile (Garantie d'ouverture 100%)
  const burgerBtn = document.querySelector('.custom-burger-btn');
  const navCollapse = document.getElementById('portfolioNav');
  if (burgerBtn && navCollapse) {
    burgerBtn.addEventListener('click', () => {
      navCollapse.classList.toggle('show');
    });

    // Fermeture automatique au clic sur un lien
    navCollapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navCollapse.classList.remove('show');
      });
    });
  }

  // Pas de défilement doux (step by step)
  const getScrollStep = () => Math.max(Math.round(window.innerHeight * 0.72), 380);

  if (btnScrollUp) {
    btnScrollUp.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollBy({
        top: -getScrollStep(),
        behavior: 'smooth'
      });
    });
  }

  if (btnScrollDown) {
    btnScrollDown.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollBy({
        top: getScrollStep(),
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 4. PARTICULES & TOILE AMBIANTE INTERACTIVE (Canvas)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 16), 80);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.45 ? 'rgba(255, 42, 133,' : 'rgba(0, 242, 254,';
        this.alpha = Math.random() * 0.65 + 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color.includes('255, 42') ? '#ff2a85' : '#00f2fe';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(255, 42, 133, ${0.16 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ==========================================================================
  // 5. INTÉGRATION FORMULAIRE WHATSAPP (En Français)
  // ==========================================================================
  const whatsappForm = document.getElementById('whatsappContactForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('senderName')?.value.trim();
      const subject = document.getElementById('senderSubject')?.value.trim();
      const message = document.getElementById('senderMessage')?.value.trim();

      const phoneNumber = "261384376156";
      
      let fullMessage = `Bonjour Julien Gabriel,\n\n`;
      fullMessage += `Je m'appelle : ${name}\n`;
      if (subject) fullMessage += `Objet : ${subject}\n`;
      fullMessage += `Message :\n${message}\n\n(Envoyé depuis votre Portfolio)`;

      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // ==========================================================================
  // 6. MODALE DÉTAILS PROJETS (En Français)
  // ==========================================================================
  const projectModal = document.getElementById('projectDetailModal');
  if (projectModal) {
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalBadge = document.getElementById('modalProjectBadge');
    const modalDescription = document.getElementById('modalProjectDesc');
    const modalFeaturesList = document.getElementById('modalProjectFeatures');
    const modalTechBadges = document.getElementById('modalProjectTech');

    const projectData = {
      cff: {
        title: "CFF Manager - Application Web de Gestion Intelligente",
        badge: "Application Web Complète",
        desc: "CFF Manager est une solution web professionnelle et robuste conçue pour automatiser la gestion administrative, centraliser les flux de données, superviser les opérations et générer des analyses analytiques en temps réel. Grâce à une architecture moderne et modulaire, elle offre une vitesse d'exécution optimale et une sécurité renforcée.",
        features: [
          "Tableau de bord dynamique avec indicateurs de performance (KPI) en direct",
          "Gestion avancée des utilisateurs, rôles et permissions sécurisées",
          "Module de suivi des opérations et traçabilité automatisée des flux",
          "Moteur de recherche rapide, filtres multi-critères et exportation des données",
          "Design responsive haute performance adapté aux PC, tablettes et smartphones"
        ],
        tech: ["HTML5 / CSS3", "Bootstrap 5", "JavaScript ES6+", "Dashboard Analytics", "Architecture Modulaire", "LocalStorage / APIs"]
      },
      snack: {
        title: "Snack Bar - Application Mobile de Commande & Caisse Tactile",
        badge: "Application Mobile / Point de Vente",
        desc: "Une application mobile moderne spécialement développée pour optimiser et fluidifier la gestion quotidienne d'un établissement de restauration rapide (Snack-Bar). Elle permet une prise de commande tactile instantanée, un calcul automatisé des additions et des taxes, et un suivi en direct des flux de vente.",
        features: [
          "Catalogue visuel et interactif des plats, boissons et formules",
          "Panier tactile ergonomique avec calcul automatique des totaux et monnaie",
          "Gestion des statuts de commandes (En attente, En préparation, Servie)",
          "Historique complet des ventes journalières et clôture de caisse simplifiée",
          "Interface mobile ultra-fluide pensée 'Mobile First' avec animations dynamiques"
        ],
        tech: ["Mobile UI / UX", "JavaScript Mobile", "Responsive Grid & Flexbox", "Caisse Tactile", "Optimisation Tactile"]
      },
      portfolio: {
        title: "Portfolio Interactif - Vitrine Numérique Professionnelle",
        badge: "Application Web Réactive & Moderne",
        desc: "Ce portfolio officiel a été conçu et développé sur-mesure pour offrir une vitrine numérique haut de gamme, fluide et parfaitement optimisée pour tous les terminaux (ordinateurs, tablettes et smartphones). Il intègre des interactions 3D immersives, une navigation intelligente bidirectionnelle et un déploiement continu automatisé via GitHub Pages.",
        features: [
          "Architecture 100% Mobile-First fluide et sans débordement sur smartphones",
          "Carte holographique réversible 3D (Recto/Verso avec effet Flip interactif)",
          "Système de navigation flottant bidirectionnel (Monter/Descendre pas à pas)",
          "Formulaire de contact direct synchronisé avec l'API WhatsApp",
          "Optimisation des contrastes visuels pour une lisibilité parfaite"
        ],
        tech: ["HTML5 Sémantique", "CSS3 Moderne", "JavaScript ES6+", "Bootstrap 5.3", "Responsive Design", "Git & GitHub Pages"]
      }
    };

    document.querySelectorAll('[data-project-trigger]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-project-trigger');
        const data = projectData[key];
        if (data) {
          modalTitle.textContent = data.title;
          modalBadge.textContent = data.badge;
          modalDescription.textContent = data.desc;
          
          modalFeaturesList.innerHTML = data.features.map(f => `
            <li class="d-flex align-items-start gap-2 mb-2">
              <i class="bi bi-check-circle-fill text-rose mt-1"></i>
              <span>${f}</span>
            </li>
          `).join('');

          modalTechBadges.innerHTML = data.tech.map(t => `
            <span class="tech-tag-pill">${t}</span>
          `).join('');
        }
      });
    });
  }

});
