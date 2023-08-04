import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  url: string = 'http://localhost:3001/items';
  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  items: Item[] = [
    {
      id: 0,
      title: 'manzana',
      price: 120,
      quantity: 2,
      completed: false,
    },
    {
      id: 1,
      title: 'peras',
      price: 90,
      quantity: 3,
      completed: true,
    },
    {
      id: 2,
      title: 'campera',
      price: 2390,
      quantity: 1,
      completed: false,
    },
    {
      id: 3,
      title: 'Remera',
      price: 750,
      quantity: 5,
      completed: true,
    },
    {
      id: 4,
      title: 'Pan',
      price: 600,
      quantity: 5,
      completed: true,
    },
    {
      id: 5,
      title: 'Pantalon',
      price: 1100,
      quantity: 2,
      completed: true,
    },
  ];

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    //return this.items;
    return this.http.get<Item[]>(this.url);
  }
  addItem(item: Item): Observable<Item> {
    // this.items.unshift(item);
    return this.http.post<Item>(this.url, item, this.httpOptions);
  }

  toggleItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.url + item.id, item, this.httpOptions);
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(this.url + item.id);
  }
}
