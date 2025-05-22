import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { ThreeDService } from '../../services/three-d.service';
import { isPlatformBrowser, NgClass, NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  private isBrowser: boolean;
  currentImageIndex = 1; // Start with hero-1.jpg
  private imageRotationInterval: any;
  private readonly totalImages = 6; // Total number of hero images we have

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
}
