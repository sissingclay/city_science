import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoadTrafficModule } from './view/road-traffic/road-traffic.module';
import { VehicleModule } from './view/road-traffic/vehicle/vehicle.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RoadTrafficModule,
        HttpClientModule,
        VehicleModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
