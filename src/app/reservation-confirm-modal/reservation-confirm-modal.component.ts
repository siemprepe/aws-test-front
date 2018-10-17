import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-confirm-modal',
  templateUrl: './reservation-confirm-modal.component.html'
})
export class ReservationConfirmModalComponent implements OnInit {
  closeResult: string;
  @Input()date: string;
  @Input()parking: string;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
