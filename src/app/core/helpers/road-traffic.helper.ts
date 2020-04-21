import { IRoad, IRoadTraffic } from './../interface/road-traffic';

export const ROADS = (
    resData,
): {
    roads: IRoad[];
    allRoads: { [key: string]: IRoadTraffic[] };
} => {
    const simpleCheck: string[] = [];
    const roads: IRoad[] = [];
    const allRoads: { [key: string]: IRoadTraffic[] } = {};

    resData.forEach((road) => {
        const lat = parseFloat(road.latitude);
        const lng = parseFloat(road.longitude);
        const i = simpleCheck.indexOf(road.road_name);

        if (!allRoads[road.road_name]) allRoads[road.road_name] = [];
        allRoads[road.road_name].push(road);

        if (i === -1) {
            simpleCheck.push(road.road_name);
            roads.push({
                road_name: road.road_name,
                latitude: lat,
                longitude: lng,
                road_category: road.road_category,
            });
        }
    });

    return { roads, allRoads };
};

export const GET_VEHICLES_DATA = (
    roads: IRoadTraffic[],
): { labels: string[]; values: number[]; type: string }[] => {
    const PIE_DATA = {
        labels: [],
        values: [],
        type: 'pie',
    };

    roads.forEach((road: IRoadTraffic) => {
        ADD_DATA(PIE_DATA, road, 'pedal_cycles');
        ADD_DATA(PIE_DATA, road, 'two_wheeled_motor_vehicles');
        ADD_DATA(PIE_DATA, road, 'cars_and_taxis');
        ADD_DATA(PIE_DATA, road, 'buses_and_coaches');
        ADD_DATA(PIE_DATA, road, 'lgvs');
        ADD_DATA(PIE_DATA, road, 'hgvs_2_rigid_axle');
        ADD_DATA(PIE_DATA, road, 'hgvs_3_rigid_axle');
        ADD_DATA(PIE_DATA, road, 'hgvs_4_or_more_rigid_axle');
        ADD_DATA(PIE_DATA, road, 'hgvs_3_or_4_articulated_axle');
        ADD_DATA(PIE_DATA, road, 'hgvs_5_articulated_axle');
        ADD_DATA(PIE_DATA, road, 'hgvs_6_articulated_axle');
    });

    return [PIE_DATA];
};

const ADD_DATA = (PIE_DATA, road, name) => {
    if (road[name]) {
        const index = PIE_DATA.labels.indexOf(name);
        if (index === -1) PIE_DATA.labels.push(name);
        index === -1
            ? PIE_DATA.values.push(road[name])
            : (PIE_DATA.values[index] = PIE_DATA.values[index] + road[name]);
    }
};
