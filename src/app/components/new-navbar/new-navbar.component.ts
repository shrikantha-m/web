import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NgIf, NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-new-navbar',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
            [ngClass]="{'bg-white/80 backdrop-blur-md shadow-lg': scrolled, 'bg-transparent': !scrolled}">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between py-4">
          <!-- Logo -->
          <a href="#" class="flex items-center gap-2 relative group">
            <!-- Create our own logo with text since we don't have direct access to verify the logo file -->
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 group-hover:shadow-lg transition-all"></div>
              <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">CF</div>
            </div>
            <span class="text-2xl font-bold">
              <span class="text-cropOrange-500">Crop</span>
              <span class="text-cropGreen-500">fresh</span>
            </span>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-gray-800 hover:text-cropGreen-500 transition-colors relative group">
              Features
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-cropGreen-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#how-it-works" class="text-gray-800 hover:text-cropGreen-500 transition-colors relative group">
              How it Works
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-cropGreen-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#problems" class="text-gray-800 hover:text-cropGreen-500 transition-colors relative group">
              Problems
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-cropGreen-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#solutions" class="text-gray-800 hover:text-cropGreen-500 transition-colors relative group">
              Solutions
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-cropGreen-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" class="text-gray-800 hover:text-cropGreen-500 transition-colors relative group">
              Testimonials
              <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-cropGreen-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- CTA Button -->
          <div class="hidden md:block">
            <button class="bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 hover:from-cropGreen-600 hover:to-cropOrange-600 text-white px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-cropGreen-500/30 font-medium">
              Early Access
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden text-gray-800 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md" (click)="toggleMobileMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div *ngIf="isMobileMenuOpen" class="md:hidden bg-white/90 backdrop-blur-lg shadow-lg">
        <div class="container mx-auto px-4 py-6 flex flex-col space-y-5">
          <a href="#features" class="text-gray-800 hover:text-cropGreen-500 transition-colors px-4 py-2 hover:bg-cropGreen-50 rounded-lg">Features</a>
          <a href="#how-it-works" class="text-gray-800 hover:text-cropGreen-500 transition-colors px-4 py-2 hover:bg-cropGreen-50 rounded-lg">How it Works</a>
          <a href="#problems" class="text-gray-800 hover:text-cropGreen-500 transition-colors px-4 py-2 hover:bg-cropGreen-50 rounded-lg">Problems</a>
          <a href="#solutions" class="text-gray-800 hover:text-cropGreen-500 transition-colors px-4 py-2 hover:bg-cropGreen-50 rounded-lg">Solutions</a>
          <a href="#testimonials" class="text-gray-800 hover:text-cropGreen-500 transition-colors px-4 py-2 hover:bg-cropGreen-50 rounded-lg">Testimonials</a>
          <button class="bg-gradient-to-r from-cropGreen-500 to-cropOrange-500 hover:from-cropGreen-600 hover:to-cropOrange-600 text-white px-4 py-3 rounded-lg transition-all shadow-lg w-full font-medium mt-2">
            Early Access
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './new-navbar.component.css'
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
      this.scrolled = window.scrollY > 50;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
