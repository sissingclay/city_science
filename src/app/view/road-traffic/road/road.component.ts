import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GET_VEHICLES_DATA_BAR } from './../../../core/helpers/road-traffic-bar.helper';

import { MapInfoWindow } from '@angular/google-maps';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
    GET_VEHICLES_DATA_SCATTER,
    largest,
} from './../../../core/helpers/road-traffic-scatter.helper';
import { GET_VEHICLES_DATA } from './../../../core/helpers/road-traffic.helper';
import { IRoadTraffic } from './../../../core/interface/road-traffic';
import { RoadTrafficService } from './../../../core/services/road-traffic.service';

@Component({
    selector: 'cs-road',
    templateUrl: './road.component.html',
    styleUrls: ['./road.component.scss'],
})
export class RoadComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    bar = {
        data: [],
        layout: {
            title: 'Comparison of 2 vehicle types',
            showlegend: false,
        },
    };
    graph = {
        data: [],
        layout: {
            autosize: true,
            title: 'Vehicle types',
            showlegend: false,
        },
    };
    scatter = {
        data: [],
        layout: {
            autosize: true,
            xaxis: {
                range: [0, 5.25],
            },
            yaxis: {
                range: [0, 80000],
            },
            title: 'Data Labels Hover',
        },
    };
    showSideBar = false;
    pageData = {
        road_category: '',
        road_type: '',
        road_name: '',
        direction_of_travel: '',
    };
    road: IRoadTraffic;
    points: IRoadTraffic[];
    center = { lat: 50.90096735, lng: -3.37083326 };
    markerOptions: {
        draggable: boolean;
        animation: any;
        title: string;
        icon?: string;
    }[] = [];
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 9;
    display?: google.maps.LatLngLiteral;
    select = '';
    barLeft = 'cars_and_taxis';
    barRight = 'lgvs';

    get name(): string {
        return this.select
            ? `${this.road.road_name} | ${this.road.start_junction_road_name} - ${this.road.end_junction_road_name} (${this.road.direction_of_travel})`
            : this.road.road_name;
    }

    constructor(
        private readonly roadTrafficService: RoadTrafficService,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        combineLatest(
            this.activatedRoute.params,
            this.roadTrafficService.allRoads$,
        )
            .pipe(
                filter((data) => !!data[0] && !!data[1]),
                map((data) => data[1][data[0].road]),
            )
            .subscribe((data) => {
                this.road = data[0];
                this.pageData.road_name = data[0].road_name;
                this.pageData.road_type = data[0].road_type;
                this.pageData.road_category = data[0].road_category;
                this.pageData.direction_of_travel = '';
                this.points = data;

                const DATA = GET_VEHICLES_DATA(data);
                const DATA_SCATTER = GET_VEHICLES_DATA_SCATTER(data);
                const DATA_BAR = GET_VEHICLES_DATA_BAR(
                    data,
                    this.barLeft,
                    this.barRight,
                );
                this.updatePieChart(DATA);
                this.updateScatterChart(DATA_SCATTER);
                this.updateBarChart(DATA_BAR);

                data.forEach((partOfRoad) => {
                    const LATLONG = {
                        lat: parseFloat(partOfRoad.latitude),
                        lng: parseFloat(partOfRoad.longitude),
                    };
                    this.markerOptions.push({
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: partOfRoad.road_name,
                    });
                    this.markerPositions.push(LATLONG);
                    this.center = LATLONG;
                });
            });
    }

    move(event: google.maps.MouseEvent): void {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(index: number): void {
        this.showSideBar = true;
        this.updateRoad(index);
    }

    roadChanged(index): void {
        this.updateRoad(index);
    }

    updateRoad(index): void {
        if (!index) {
            this.showSideBar = false;
        }
        this.road = !index ? this.points[0] : this.points[index];

        this.pageData.direction_of_travel = index
            ? this.points[index].direction_of_travel
            : '';
        this.select = index;
        const DATA = GET_VEHICLES_DATA(!index ? this.points : [this.road]);
        const DATA_SCATTER = GET_VEHICLES_DATA_SCATTER(
            !index ? this.points : [this.road],
        );
        const DATA_BAR = GET_VEHICLES_DATA_BAR(
            !index ? this.points : [this.road],
            this.barLeft,
            this.barRight,
        );
        this.updatePieChart(DATA);
        this.updateScatterChart(DATA_SCATTER);
        this.updateBarChart(DATA_BAR);
    }

    updatePieChart(DATA): void {
        this.graph = {
            data: DATA,
            layout: {
                autosize: true,
                title: `Vehicle types for ${this.name}`,
                showlegend: false,
            },
        };
    }

    updateScatterChart(DATA): void {
        this.scatter = {
            data: DATA,
            layout: {
                autosize: true,
                xaxis: {
                    range: [0, 13],
                },
                yaxis: {
                    range: [0, largest + 500],
                },
                title: this.select
                    ? this.name
                    : `Vehicle types by road section and direction`,
            },
        };
    }

    updateBarChart(DATA): void {
        this.bar = {
            data: DATA,
            layout: {
                title: 'Comparison of 2 vehicle types',
                showlegend: false,
            },
        };
    }

    barChanged(): void {
        const DATA_BAR = GET_VEHICLES_DATA_BAR(
            !this.select ? this.points : [this.road],
            this.barLeft,
            this.barRight,
        );
        this.updateBarChart(DATA_BAR);
    }

    objectKeys(obj): any {
        return Object.keys(obj);
    }
}
