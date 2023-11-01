import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BgcolorManagerService {
  private backgroundColor: BehaviorSubject<string> = new BehaviorSubject<string>('white');

  getBackgroundColor(): Observable<string> {
    return this.backgroundColor.asObservable();
  }

  setBackgroundColor(color: string): void {
    this.backgroundColor.next(color);
  }

  constructor() { }
}
