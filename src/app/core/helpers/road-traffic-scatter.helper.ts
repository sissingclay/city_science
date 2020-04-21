import { IRoad, IRoadTraffic } from '../interface/road-traffic';

export interface IScatter {
    x: number[];
    y: number[];
    mode: 'markers';
    type: 'scatter';
    name: string;
    text: string[];
    marker: { size: 12 };
}

export let largest = 0;

export const GET_VEHICLES_DATA_SCATTER = (
    roads: IRoadTraffic[],
): IScatter[] => {
    const SCATTER_DATA: IScatter[] = [];
    largest = 0;

    roads.forEach((road: IRoadTraffic, i) => {
        SCATTER_DATA.push({
            x: [],
            y: [],
            mode: 'markers',
            type: 'scatter',
            name: `${road.start_junction_road_name} (${road.direction_of_travel})`,
            text: [],
            marker: { size: 12 },
        });
        ADD_DATA(SCATTER_DATA, road, 'pedal_cycles', i, 1);
        ADD_DATA(SCATTER_DATA, road, 'two_wheeled_motor_vehicles', i, 2);
        ADD_DATA(SCATTER_DATA, road, 'cars_and_taxis', i, 3);
        ADD_DATA(SCATTER_DATA, road, 'buses_and_coaches', i, 4);
        ADD_DATA(SCATTER_DATA, road, 'lgvs', i, 5);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_2_rigid_axle', i, 6);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_3_rigid_axle', i, 7);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_4_or_more_rigid_axle', i, 8);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_3_or_4_articulated_axle', i, 9);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_5_articulated_axle', i, 10);
        ADD_DATA(SCATTER_DATA, road, 'hgvs_6_articulated_axle', i, 11);
    });

    return SCATTER_DATA;
};

const ADD_DATA = (SCATTER_DATA, road, name, ii, count) => {
    SCATTER_DATA[ii].x.push(parseFloat(`${count}.${ii}4`));
    SCATTER_DATA[ii].y.push(road[name]);
    SCATTER_DATA[ii].text.push(name);
    largest = road[name] > largest ? road[name] : largest;
};
