import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NgIf, NgClass, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-navbar',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
            [ngClass]="{'bg-white/40 backdrop-blur-xl shadow-lg border-b border-white/20': scrolled,
                       'bg-transparent': !scrolled}">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between py-4">
          <!-- Logo -->
          <a href="#" class="flex items-center gap-2 relative group">
            <!-- Logo with 3D effect -->
            <div class="relative transition-all duration-300 group-hover:scale-110">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cropGreen-500 to-cropOrange-500
                          shadow-lg shadow-cropGreen-500/20 group-hover:shadow-cropOrange-500/30 transition-all"></div>
              <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">CF</div>
              <div class="absolute -inset-1 bg-gradient-to-r from-cropGreen-400/20 to-cropOrange-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span class="text-2xl font-bold transition-all duration-300">
              <span class="text-cropOrange-500 group-hover:text-cropOrange-600">Crop</span>
              <span class="text-cropGreen-500 group-hover:text-cropGreen-600">fresh</span>
            </span>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-gray-800 hover:text-cropGreen-500 transition-all duration-300 relative group">
              Features
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" class="text-gray-800 hover:text-cropGreen-500 transition-all duration-300 relative group">
              How it Works
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#problems" class="text-gray-800 hover:text-cropGreen-500 transition-all duration-300 relative group">
              Problems
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#solutions" class="text-gray-800 hover:text-cropGreen-500 transition-all duration-300 relative group">
              Solutions
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" class="text-gray-800 hover:text-cropGreen-500 transition-all duration-300 relative group">
              Testimonials
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- CTA Button -->
          <div class="hidden md:block">
            <a routerLink="/early-access" class="relative overflow-hidden bg-gradient-to-r from-cropGreen-500 to-cropOrange-500
                          hover:from-cropGreen-600 hover:to-cropOrange-600 text-white px-6 py-2.5 rounded-full
                          transition-all shadow-lg hover:shadow-cropGreen-500/40 font-medium hover:translate-y-[-2px] inline-block">
              <span class="relative z-10">Early Access</span>
              <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden text-gray-800 bg-white/80 backdrop-blur-xl p-2 rounded-lg shadow-md border border-white/50 hover:shadow-lg transition-all" (click)="toggleMobileMenu()">
            <svg *ngIf="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg *ngIf="isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu with Glassmorphism -->
      <div *ngIf="isMobileMenuOpen" class="md:hidden bg-white/60 backdrop-blur-xl shadow-xl border-t border-white/20 animate-fadeIn">
        <div class="container mx-auto px-4 py-6 flex flex-col space-y-4">
          <a href="#features" class="text-gray-800 hover:text-cropGreen-500 transition-all px-4 py-3 hover:bg-cropGreen-50/50 rounded-lg flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cropGreen-500 mr-2"></span>
            Features
          </a>
          <a href="#how-it-works" class="text-gray-800 hover:text-cropGreen-500 transition-all px-4 py-3 hover:bg-cropGreen-50/50 rounded-lg flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cropGreen-500 mr-2"></span>
            How it Works
          </a>
          <a href="#problems" class="text-gray-800 hover:text-cropGreen-500 transition-all px-4 py-3 hover:bg-cropGreen-50/50 rounded-lg flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cropGreen-500 mr-2"></span>
            Problems
          </a>
          <a href="#solutions" class="text-gray-800 hover:text-cropGreen-500 transition-all px-4 py-3 hover:bg-cropGreen-50/50 rounded-lg flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cropGreen-500 mr-2"></span>
            Solutions
          </a>
          <a href="#testimonials" class="text-gray-800 hover:text-cropGreen-500 transition-all px-4 py-3 hover:bg-cropGreen-50/50 rounded-lg flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-cropGreen-500 mr-2"></span>
            Testimonials
          </a>
          <a routerLink="/early-access" class="relative overflow-hidden bg-gradient-to-r from-cropGreen-500 to-cropOrange-500
                        hover:from-cropGreen-600 hover:to-cropOrange-600 text-white px-4 py-3 rounded-lg
                        transition-all shadow-lg w-full font-medium mt-2 hover:shadow-cropGreen-500/30 inline-block text-center">
            <span class="relative z-10">Early Access</span>
            <div class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine"></div>
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shine {
      from { left: -100%; }
      to { left: 100%; }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }

    .animate-shine {
      animation: shine 1.5s infinite;
    }
  `]
})
export class NewNavbarComponent {
  scrolled = false;
  isMobileMenuOpen = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 20; // Reduced threshold for quicker effect
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
