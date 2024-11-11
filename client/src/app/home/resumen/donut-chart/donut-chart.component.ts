import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import pattern from 'patternomaly';
import { CHARTS_UTILS } from '../../../../assets/chartsUtils';

@Component({
    selector: 'app-donut-chart',
    standalone: true,
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './donut-chart.component.html',
    styleUrl: './donut-chart.component.css',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent {

    DARK_RED: string = CHARTS_UTILS.DARK_RED;
    WHITE: string = 'white';

    public doughnutChartLabels: string[] = [
        CHARTS_UTILS.OCUPADO,
        CHARTS_UTILS.ESPACIO_LIBRE
    ];

    public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
        {
            data: [8, 34], label: 'Cajas', borderWidth: 0,
            backgroundColor: [
                pattern.draw('line', CHARTS_UTILS.DARK_RED, CHARTS_UTILS.LINES_PATTERN, 8), // Ocupado (red)
                pattern.draw('line', CHARTS_UTILS.GRAY_PATTERN, CHARTS_UTILS.LINES_PATTERN, 8), // Espacio Libre (white)
            ],
            hoverBackgroundColor: [
                pattern.draw('line', CHARTS_UTILS.LIGHT_RED, CHARTS_UTILS.LINES_PATTERN, 8),
                pattern.draw('line', CHARTS_UTILS.GRAY_PATTERN, CHARTS_UTILS.LINES_PATTERN, 8)
            ]
        }
    ];


    public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white',
                    font: {
                        family: 'Lexend',
                        size: 14
                    },
                    usePointStyle: true, // Leyenda representadas por puntos

                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels && data.datasets.length) {
                            return data.labels.slice().reverse().map((label, i) => {  // Usamos slice() para no modificar el array original
                                const dataset = data.datasets[0];
                                const index = 1 - i;  // Calculamos el índice original
                                const value = dataset.data[index] as number;
                                const percentage = ((value / (dataset.data as number[]).reduce((a, b) => a + b)) * 100).toFixed(1);
                                return {
                                    text: `${percentage}%`,
                                    fontColor: 'white',
                                    hidden: isNaN(value),
                                    index: index,
                                };
                            });
                        }
                        return [];
                    }
                }
            }
        }
    };

    constructor() { }
}
