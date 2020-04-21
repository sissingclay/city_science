import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoadTrafficComponent } from './view/road-traffic/road-traffic.component';
import { RoadComponent } from './view/road-traffic/road/road.component';
import { RoadsComponent } from './view/road-traffic/roads/roads.component';

const routes: Routes = [
    {
        path: '',
        component: RoadTrafficComponent,
        children: [
            { path: '', component: RoadsComponent },
            { path: 'road/:road', component: RoadComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
