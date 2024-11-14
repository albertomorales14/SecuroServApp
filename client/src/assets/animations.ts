import { trigger, transition, style, animate } from '@angular/animations';

export const homeComponentAnimation = [
    trigger('aparecer1', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('800ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('aparecer2', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('1200ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('aparecer3', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('1500ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('aparecer4', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ])
];

export const popUpAnimation = [
    trigger('showPopUp', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('800ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ])
];