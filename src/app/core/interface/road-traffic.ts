export interface IRoadTrafficCollection {
    data: IRoadTraffic[];
    links: ILinks;
    meta: IMeta;
}

export interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: number;
    per_page: number;
    to: number;
    total: number;
}

interface ILinks {
    first: string;
    last: string;
    next: string;
    prev: string;
}

export interface IRoadTraffic {
    count_point_id: number;
    year: number;
    estimation_method: string;
    direction_of_travel: string;
    pedal_cycles: number;
    two_wheeled_motor_vehicles: number;
    cars_and_taxis: number;
    buses_and_coaches: number;
    lgvs: number;
    hgvs_2_rigid_axle: number;
    hgvs_3_rigid_axle: number;
    hgvs_4_or_more_rigid_axle: number;
    hgvs_3_or_4_articulated_axle: number;
    hgvs_5_articulated_axle: number;
    hgvs_6_articulated_axle: number;
    all_hgvs: number;
    all_motor_vehicles: number;
    region_id: number;
    local_authority_id: number;
    road_name: string;
    road_category: string;
    road_type: string;
    start_junction_road_name: string;
    end_junction_road_name: string;
    easting: number;
    northing: number;
    latitude: string;
    longitude: string;
    link_length_km: string;
    link_length_miles: string;
    sequence: number;
    ramp?: any;
}

export interface IRoad {
    road_name: string;
    latitude: number;
    longitude: number;
    road_category: string;
}
