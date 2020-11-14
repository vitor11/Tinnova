import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
  // styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  //@Input() title: string;
  @Input() title: string;
  @Input() message: string;
  @Input() cabecalho: string;

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }
  

  ngOnInit() {
      
      this.confirmResult = new Subject();
      this.bsModalRef.setClass('modal-xl');
  }

  onConfirm(){
    this.confirmAndCLose(true);
  }

  onClose(){
    this.confirmAndCLose(false);
  }

  private confirmAndCLose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}
