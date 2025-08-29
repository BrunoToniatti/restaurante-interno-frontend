import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit, OnDestroy {
  private lastScrollY = 0;
  private ticking = false;

  ngOnInit() {
    this.initializeNavbar();
  }

  ngOnDestroy() {
    // Cleanup se necessário
  }

  private initializeNavbar() {
    // Adicionar event listeners para funcionalidades da navbar
    this.setupMobileToggle();
    this.setupScrollEffects();
    this.setupNavLinks();
  }

  private setupMobileToggle() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (mobileToggle && navbarMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
      });

      // Fechar menu ao clicar em um link
      const navLinks = navbarMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('active');
          navbarMenu.classList.remove('active');
        });
      });
    }
  }

  private setupScrollEffects() {
    const navbar = document.getElementById('navbar');

    if (navbar) {
      const updateNavbar = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Efeito parallax suave
        if (scrollY > this.lastScrollY) {
          // Scrolling down
          if (scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
          }
        } else {
          // Scrolling up
          navbar.style.transform = 'translateY(0)';
        }

        this.lastScrollY = scrollY;
        this.ticking = false;
      };

      const requestTick = () => {
        if (!this.ticking) {
          requestAnimationFrame(updateNavbar);
          this.ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
    }
  }

  private setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Adicionar efeito de ripple
        this.createRippleEffect(link as HTMLElement, e as MouseEvent);
      });
    });
  }

  private createRippleEffect(element: HTMLElement, event: MouseEvent) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Adicionar CSS para o ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(201, 168, 118, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Fechar menu mobile ao redimensionar
    const mobileToggle = document.getElementById('mobileToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (window.innerWidth > 768) {
      mobileToggle?.classList.remove('active');
      navbarMenu?.classList.remove('active');
    }
  }

  // Métodos públicos para interação com a navbar
  public showNotification(message: string) {
    // Implementar sistema de notificações
    console.log('Notification:', message);
  }

  public updateUserInfo(name: string, role: string) {
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');

    if (userName) userName.textContent = name;
    if (userRole) userRole.textContent = role;
  }
}
