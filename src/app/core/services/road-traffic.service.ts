import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ROADS } from '../helpers/road-traffic.helper';
import {
    IRoad,
    IRoadTraffic,
    IRoadTrafficCollection,
} from './../interface/road-traffic';

const ENDPOINT =
    'https://roadtraffic.dft.gov.uk/api/average-annual-daily-flow-by-direction?filter[local_authority_id]=71';

@Injectable()
export class RoadTrafficService {
    roadData$ = new Subject<IRoadTrafficCollection>();
    roads$ = new BehaviorSubject<IRoad[]>([]);
    allRoads$ = new BehaviorSubject<{
        [key: string]: IRoadTraffic[];
    }>(null);
    amountOfRoads$ = new BehaviorSubject<number>(0);

    constructor(private readonly http: HttpClient) {}

    getTrafficData(): Observable<IRoadTrafficCollection> {
        return this.http.get<IRoadTrafficCollection>(ENDPOINT).pipe(
            tap((res) => {
                const DATA = ROADS(res.data);
                this.roadData$.next(res);
                this.roads$.next(DATA.roads);
                this.amountOfRoads$.next(DATA.roads.length);
                this.allRoads$.next(DATA.allRoads);
            }),
        );
    }
}
