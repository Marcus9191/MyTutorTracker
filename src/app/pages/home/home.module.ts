import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})

export class HomePageModule {}
