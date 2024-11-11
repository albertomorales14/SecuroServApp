import { Component, ViewEncapsulation, Input } from '@angular/core';

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

}
