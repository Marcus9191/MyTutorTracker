import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { NgxTranslateModule } from './translate.module';


@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxTranslateModule,
    ReactiveFormsModule
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule,
    NgxTranslateModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    IonicModule
  ]
})

export class SharedModule { }