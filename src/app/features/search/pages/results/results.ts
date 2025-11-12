// features/search/pages/results/results.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: false,
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Resultados</h1>
      <pre class="bg-slate-100 p-3 rounded">
{{ (route.snapshot.queryParams | json) }}
      </pre>
    </div>
  `
})
export class SearchResultsComponent {
  constructor(public route: ActivatedRoute) {}
}
