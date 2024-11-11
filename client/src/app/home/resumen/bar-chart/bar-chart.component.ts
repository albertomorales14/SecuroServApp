import { Component } from '@angular/core';
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import pattern from 'patternomaly';
import { CHARTS_UTILS } from '../../../../assets/chartsUtils';

@Component({
    selector: 'app-bar-chart',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

    public barChartLabels: string[] = ['GRANDE', 'PEQUE', 'GRANDE', 'MEDIANO', 'PEQUE'];
    public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
        {
            data: [65, 11, 80, 31, 24], label: CHARTS_UTILS.MERCANCIA_ESPECIAL,
            backgroundColor: pattern.draw('line', CHARTS_UTILS.DARK_RED, CHARTS_UTILS.LINES_PATTERN, 8),
            hoverBackgroundColor: pattern.draw('line', CHARTS_UTILS.LIGHT_RED, CHARTS_UTILS.LINES_PATTERN, 8)
        },
        {
            data: [111, 24, 111, 42, 0], label: CHARTS_UTILS.CAPACIDAD_MAX,
            backgroundColor: pattern.draw('line', CHARTS_UTILS.GRAY_PATTERN, CHARTS_UTILS.LINES_PATTERN, 8)
        }

    ];

    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                border: {
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                }
            },
            y: {
                max: 120,
                stacked: true,
                grid: {
                    color: CHARTS_UTILS.GRID_COLOR,
                },
                beginAtZero: true,
                border: {
                    color: 'white',
                },
                ticks: {
                    color: 'white',
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white',
                    font: {
                        family: 'Lexend',
                        size: 14
                    },
                    usePointStyle: true // Leyenda representadas por puntos
                }
            }
        }
    };

    constructor() { }
}
