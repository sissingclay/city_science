import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoadComponent } from './road/road.component';
import { RoadsComponent } from './roads/roads.component';

const routes: Routes = [
    {
        path: '',
        component: RoadsComponent,
    },
    {
        path: 'road/:road',
        component: RoadComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoadTrafficRoutingModule {}
