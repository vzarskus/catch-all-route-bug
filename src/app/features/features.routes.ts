import { Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';

export const FEATURES_ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      { path: 'details', component: FeatureDetailsComponent },
      { path: 'view', redirectTo: 'details', pathMatch: 'full' },
    ],
  },
];
