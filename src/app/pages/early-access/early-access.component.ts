import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-early-access',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './early-access.component.html',
  styleUrl: './early-access.component.css'
})
export class EarlyAccessComponent {
  formData = {
    name: '',
    email: '',
    organization: '',
    role: '',
    interests: [] as string[]
  };

  interestOptions = [
    { id: 'marketplace', label: 'Marketplace Access' },
    { id: 'logistics', label: 'Logistics Solutions' },
    { id: 'financing', label: 'Financial Services' },
    { id: 'knowledge', label: 'Knowledge Hub' },
    { id: 'analytics', label: 'Analytics & Insights' }
  ];

  submitted = false;
  submitting = false;
  errorMessage = '';

  toggleInterest(interest: string): void {
    const index = this.formData.interests.indexOf(interest);
    if (index === -1) {
      this.formData.interests.push(interest);
    } else {
      this.formData.interests.splice(index, 1);
    }
  }

  isInterestSelected(interest: string): boolean {
    return this.formData.interests.includes(interest);
  }

  onSubmit(): void {
    this.submitting = true;
    this.errorMessage = '';
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', this.formData);
      this.submitted = true;
      this.submitting = false;
    }, 1500);
  }
}