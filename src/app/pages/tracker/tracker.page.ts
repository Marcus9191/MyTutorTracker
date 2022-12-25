import { Component } from '@angular/core';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

import { PathService } from 'src/app/shared/services/path.service';
import { Path } from 'src/app/core/models';

const TIMEOUT = 1000;

@Component({
  selector: 'app-tracker',
  templateUrl: 'tracker.page.html',
  styleUrls: ['tracker.page.scss'],
})

export class TrackerPage {

  pathsMap: Map<CallbackID, Path>;
  positionOptions: PositionOptions;
  callbackId?: CallbackID;
  timeout?: NodeJS.Timeout;

  constructor(private platform: Platform, private pathService: PathService) {
    this.pathsMap = new Map<CallbackID, Path>();
    this.callbackId = undefined;
    this.timeout = undefined;

    this.positionOptions = {
      enableHighAccuracy: true,
      timeout: 1000
    };
  }

  ionViewWillEnter() {
    this.setResumeSubscription(true);
    //this.startWatch();
  }

  ionViewWillLeave() {
    this.setResumeSubscription(false);
    //this.stopWatch();
  }

  setResumeSubscription(state: boolean) {
    if (state == true) {
      this.platform.pause.subscribe(() => { this.stopWatch() });
      this.platform.resume.subscribe(() => { this.startWatch() });
    } else {
      this.platform.resume.unsubscribe();
      this.platform.pause.unsubscribe();
    }
  }

  startWatch() {
    Geolocation.watchPosition(this.positionOptions, this.watchPositionCallback.bind(this))
    .then((callbackId: CallbackID) => {
      this.callbackId = callbackId;
    });

    this.timeout = setTimeout(this.watch, TIMEOUT);
  }

  watch() {
    if (this.callbackId == null || this.pathsMap == null || this.pathsMap.has(this.callbackId) == false) return;

    let path = this.pathsMap.get(this.callbackId) as Path;
    this.pathService.clock(path);
  }

  stopWatch() {
    if (this.callbackId == null) return;

    Geolocation.clearWatch({id: this.callbackId});
    this.callbackId = undefined;
    clearInterval(this.timeout);
  }

  watchPositionCallback(position: Position | null, err: any) {
    console.log(this.callbackId)
    console.log(this.pathsMap)
    if (position == null || this.callbackId == null) return;
    else if (this.pathsMap.has(this.callbackId) == false) {
      this.pathsMap.set(this.callbackId, new Path(this.callbackId));
    }

    this.pathsMap.get(this.callbackId)?.addPosition(position);
  }
}
