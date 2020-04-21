import { IRoadTraffic } from '../interface/road-traffic';

export interface IBar {
    x: string[];
    y: number[];
    type: 'bar';
}

export let largest = 0;

export const GET_VEHICLES_DATA_BAR = (
    roads: IRoadTraffic[],
    leftBar: string,
    rightBar: string,
): IBar[] => {
    const BAR_DATA: IBar[] = [
        {
            x: [],
            y: [],
            type: 'bar',
        },
    ];
    largest = 0;

    roads.forEach((road: IRoadTraffic) => {
        ADD_DATA(BAR_DATA, road, leftBar, 0);
        ADD_DATA(BAR_DATA, road, rightBar, 1);
    });

    return BAR_DATA;
};

const ADD_DATA = (BAR_DATA, road, name, item) => {
    if (BAR_DATA[0].x.indexOf(name) === -1) BAR_DATA[0].x.push(name);
    BAR_DATA[0].y[item]
        ? (BAR_DATA[0].y[item] = BAR_DATA[0].y[item] + road[name])
        : BAR_DATA[0].y.push(road[name]);
};
