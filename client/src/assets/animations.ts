import { trigger, transition, style, animate } from '@angular/animations';

export const homeComponentAnimation = [
    trigger('aparecer1', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('800ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('aparecer2', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('950ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('aparecer3', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1000ms ease-in', style({ opacity: 1 }))
        ])
    ])
];