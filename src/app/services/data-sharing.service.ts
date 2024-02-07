import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private tabChangeEventSource = new BehaviorSubject<any>(null);
  tabChangeEvent$ = this.tabChangeEventSource.asObservable();

  constructor() {}

  sendTabChangeEvent(student: any) {
    this.tabChangeEventSource.next(student);
  }
}
