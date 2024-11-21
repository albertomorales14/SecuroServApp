import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    isModalOpen = false;
    item: any;

    constructor() { }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    setItem(item: any) {
        this.item = item;
    }

    getItem() {
        return this.item;
    }

}
