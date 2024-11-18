import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const homeComponentAnimation = [
    trigger('showHomeComponent1', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'white' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('100ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent2', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'white' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('200ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent3', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('200ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' })),
            animate('200ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('700ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent4', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('400ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent5', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('500ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent6', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('1000ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('800ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ]),
    trigger('showHomeComponent7', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('1000ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' })),
            animate('400ms ease-in', style({ opacity: 0.5, backgroundColor: 'white' })),
            animate('900ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ])
];

export const mapAnimation = [
    trigger('showFilterButton1', [
        transition(':enter', [
            animate('1000ms', keyframes([
                style({ opacity: 0, backgroundColor: 'white', offset: 0 }),
                style({ opacity: 1, backgroundColor: 'white', offset: 0.5 }),
                style({ opacity: 0.5, backgroundColor: 'white', offset: 0.75 }),
                style({ opacity: 1, backgroundColor: '#90221c', offset: 1 })
            ])),
        ])
    ]),
    trigger('showFilterButton2', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('600ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('showFilterButton3', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('700ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('showFilterButton4', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('800ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('showFilterButton5', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('900ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('showFilterButton6', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1000ms ease-in', style({ opacity: 1 }))
        ])
    ]),
    trigger('showFilterButton7', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1100ms ease-in', style({ opacity: 1 }))
        ])
    ])
];

export const popUpAnimation = [
    trigger('showPopUp', [
        transition(':enter', [
            style({ opacity: 0, backgroundColor: 'white' }),
            animate('300ms ease-in', style({ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }))
        ])
    ])
];