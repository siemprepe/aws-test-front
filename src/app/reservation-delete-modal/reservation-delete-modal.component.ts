import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-delete-modal',
  templateUrl: './reservation-delete-modal.component.html'
})
export class ReservationDeleteModalComponent implements OnInit {
  closeResult: string;
  @Input()date: string;
  @Input()parking: string;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
