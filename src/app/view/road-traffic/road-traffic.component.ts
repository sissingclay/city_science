import { Component, OnInit, ViewChild } from '@angular/core';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import {
    IMeta,
    IRoadTraffic,
    IRoadTrafficCollection,
} from './../../core/interface/road-traffic';
import { RoadTrafficService } from './../../core/services/road-traffic.service';

@Component({
    selector: 'cs-road-traffic',
    templateUrl: './road-traffic.component.html',
    styleUrls: ['./road-traffic.component.scss'],
})
export class RoadTrafficComponent implements OnInit {
    constructor(public roadTrafficService: RoadTrafficService) {}

    ngOnInit(): void {
        this.roadTrafficService.getTrafficData().subscribe();
    }
}
