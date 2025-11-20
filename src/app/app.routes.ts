import { Routes } from '@angular/router';
import { HeroesComponent } from './feature/heroes/heroes.component';
import { FavoritesComponent } from './feature/favorites/favorites.component';
import { LabelsComponent } from './feature/labels/labels.component';
import { SearchComponent } from './feature/search/search.component';

export const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' },
];

