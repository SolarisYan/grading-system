import { Injectable } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isVisible = false;

  constructor(private modalService: NzModalService) { }

  /** 是否可见 */
  get isVisible(): boolean {
    return this._isVisible;
  }

  open() {
    setTimeout(() => (this._isVisible = true));
  }

  close() {
    setTimeout(() => (this._isVisible = false));
  }
}
