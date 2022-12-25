import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TrackerPage } from './tracker.page';

import { TrackerPageRoutingModule } from './tracker-routing.module';
import { NgxTranslateModule } from 'src/app/shared/translate.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxTranslateModule,
    TrackerPageRoutingModule
  ],
  declarations: [TrackerPage]
})

export class TrackerPageModule {}
