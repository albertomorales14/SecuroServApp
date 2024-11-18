import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
    selector: 'app-no-comprado',
    standalone: true,
    imports: [],
    templateUrl: './no-comprado.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NoCompradoComponent {

    @Input() markerData: any;
    @Input() imageSrc: string = '';

    constructor(private modalService: ModalService) { }

    openModal() {
        this.modalService.openModal();
    }
}
