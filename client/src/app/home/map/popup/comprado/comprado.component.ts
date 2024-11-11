import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'app-comprado',
    standalone: true,
    imports: [],
    templateUrl: './comprado.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CompradoComponent {

    @Input() markerData: any;
    @Input() imageSrc: string = '';

}
