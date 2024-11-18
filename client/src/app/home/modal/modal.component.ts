import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { MODAL_UTILS } from '../../../assets/modalUtils';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css'
})
export class ModalComponent {

    @Output() close = new EventEmitter<void>();
    // Params
    modalType: number = -1;
    modalHeader: string = MODAL_UTILS.BUY_WAREHOUSE_TITLE;
    modalBody: string = MODAL_UTILS.BUY_WAREHOUSE_BODY;

    constructor(private modalService: ModalService) {
        
    }

    ngOnInit() {
        
    }

    closeModal() {
        this.close.emit();
    }

    handleConfirm() {
        
        
    }
}
