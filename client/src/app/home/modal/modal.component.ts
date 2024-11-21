import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { MODAL_UTILS } from '../../../assets/modalUtils';
import { WarehouseService } from '../../services/warehouse/warehouse.service';
import { Router } from '@angular/router';
import { MapService } from '../../services/map/map.service';

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

    constructor(
        private modalService: ModalService, 
        private mapService: MapService,
        private warehouseService: WarehouseService, 
        private router: Router
    ) {}

    ngOnInit() {

    }

    closeModal() {
        this.close.emit();
    }

    // provisional: comprar almacen
    handleConfirm() {

        this.warehouseService.updateWareHouse(
            this.modalService.getItem()._id, {
            comprado: true
        }).subscribe(() => {
            this.router.navigate(['/home']);
            // Recargar markers
            this.mapService.refreshMarkers();
            this.close.emit();
        });

        
    }
}
