import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-details',
  standalone: true,
  imports: [],
  templateUrl: './feature-details.component.html',
  styleUrl: './feature-details.component.css',
})
export class FeatureDetailsComponent {
  featureName = 'Sample Feature';
  featureDescription = 'This is a detailed description of the sample feature.';
}
