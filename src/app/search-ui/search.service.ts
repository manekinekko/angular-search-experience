import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

export interface Application {
  category: string;
  rating: number;
  name: string;
  image: string;
  link: string;
  ratingCount: number;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  fetchMocks(search: string) {
    return this.http.get(environment.mock.url).pipe(
      map((data: Application[]) => {
        return data.map(d => {
          d.image = 'https://ng2training.com/wp-content/uploads/2015/12/angular.png';
          return d;
        });
      }),
      map(apps => apps.filter(app => search.length > 0 && new RegExp(`${search}`).test(app.name)))
    );
  }
}
