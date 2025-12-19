export const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home')
        .then(m => m.HomeComponent)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search-flights/search-flights.component')
        .then(m => m.SearchFlightsComponent)
  }
];
