import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';

import { RoadTrafficService } from './../../core/services/road-traffic.service';
import { RoadTrafficRoutingModule } from './road-traffic-routing.module';
import { RoadTrafficComponent } from './road-traffic.component';
import { RoadComponent } from './road/road.component';
import { RoadsComponent } from './roads/roads.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
    declarations: [RoadTrafficComponent, RoadsComponent, RoadComponent],
    imports: [
        CommonModule,
        PlotlyModule,
        GoogleMapsModule,
        RoadTrafficRoutingModule,
        FormsModule,
    ],
    exports: [RoadTrafficComponent, RoadsComponent, RoadComponent],
    providers: [RoadTrafficService],
})
export class RoadTrafficModule {}
