import { NgModule } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@NgModule({
  declarations: [],
  imports: [HighchartsChartComponent],
  exports: [HighchartsChartComponent],
  providers: [
    {
      provide: 'Highcharts',
      useValue: Highcharts
    }
  ]
})
export class HighchartsModule { } 