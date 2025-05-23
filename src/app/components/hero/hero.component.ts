import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ThreeDService } from '../../services/three-d.service';
import { isPlatformBrowser, NgClass, NgFor, NgForOf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass, NgFor, NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('imageContainer') private imageContainerRef!: ElementRef<HTMLElement>;

  private isBrowser: boolean;
  currentImageIndex = 1; // Start with hero-1.jpg
  private imageRotationInterval: any;
  private readonly totalImages = 6; // Total number of hero images we have
  private mousePosition = { x: 0, y: 0 };

  constructor(
    private threeDService: ThreeDService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Rotate hero images every 5 seconds
      this.imageRotationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex % this.totalImages) + 1;
      }, 5000);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.threeDService.createScene(this.canvasRef);
      this.threeDService.animate();

      // Add mouse move handler for 3D rotation effect on image container
      this.setupMouseRotation();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.imageRotationInterval) {
      clearInterval(this.imageRotationInterval);
    }
  }

  // Method to set the current image directly
  setCurrentImage(index: number): void {
    if (index >= 1 && index <= this.totalImages) {
      this.currentImageIndex = index;

      // Reset the auto-rotation timer
      if (this.imageRotationInterval) {
        clearInterval(this.imageRotationInterval);
        this.imageRotationInterval = setInterval(() => {
          this.currentImageIndex = (this.currentImageIndex % this.totalImages) + 1;
        }, 5000);
      }
    }
  }

  // Track mouse position for 3D rotation effect
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isBrowser && this.imageContainerRef) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized position (-1 to 1)
      this.mousePosition.x = (clientX / innerWidth) * 2 - 1;
      this.mousePosition.y = (clientY / innerHeight) * 2 - 1;

      // Apply rotation to image container based on mouse position
      const element = this.imageContainerRef.nativeElement;
      const rotateY = this.mousePosition.x * 5; // Horizontal rotation
      const rotateX = -this.mousePosition.y * 5; // Vertical rotation

      element.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
  }

  // Setup mouse rotation effect
  private setupMouseRotation(): void {
    if (this.imageContainerRef) {
      const element = this.imageContainerRef.nativeElement;

      // Reset rotation when mouse leaves
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      });
    }
  }
}
