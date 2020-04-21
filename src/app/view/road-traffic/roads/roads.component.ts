import { Component, OnInit, ViewChild } from '@angular/core';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { Router } from '@angular/router';
import { IRoad } from './../../../core/interface/road-traffic';
import { RoadTrafficService } from './../../../core/services/road-traffic.service';

@Component({
    selector: 'cs-roads',
    templateUrl: './roads.component.html',
    styleUrls: ['./roads.component.scss'],
})
export class RoadsComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    center = { lat: 50.90096735, lng: -3.37083326 };
    markerOptions: {
        draggable: boolean;
        animation: any;
        title: string;
    }[] = [];
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 9;
    display?: google.maps.LatLngLiteral;
    isLoading = true;
    roads: string[] = [];
    road;

    constructor(
        private readonly roadTrafficService: RoadTrafficService,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.roadTrafficService.roads$.subscribe((res) => {
            this.setMapMarkers(res);
        });
    }

    setMapMarkers(resData: IRoad[]): void {
        resData.forEach((road) => {
            const lat = road.latitude;
            const lng = road.longitude;

            this.roads.push(road.road_name);

            this.markerOptions.push({
                draggable: false,
                animation: google.maps.Animation.DROP,
                title: road.road_name,
            });

            this.markerPositions.push({ lat, lng });

            this.center = { lat, lng };
        });

        this.isLoading = false;
    }

    move(event: google.maps.MouseEvent): void {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker, index: number): void {
        this.road = this.roads[index];
        this.infoWindow.open(marker);
    }

    goTo(road): void {
        this.router.navigate(['road', road]);
    }
}
