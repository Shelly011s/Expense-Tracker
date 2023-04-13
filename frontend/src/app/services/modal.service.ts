import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal = this.showModalSubject.asObservable();

  constructor() { }

  public onOpenModal(): void {
    this.showModalSubject.next(true);
  }
  public onCloseModal(): void {
    console.log('close modal');
    this.showModalSubject.next(false);
  }
}
