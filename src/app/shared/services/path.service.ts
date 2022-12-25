import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';

import { Path } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})

export class PathService {

  constructor() { }

  clock(path: Path) {
    let lastPosition = path?.getLastPosition();

    if (lastPosition == null) return;
    else path.avgSpeed = this.calculateAverage(path.avgSpeed, lastPosition.coords.speed, path.seconds++);
  }

  updatePosition(path: Path, position: Position) : void{
    if (path == null || position == null || position.coords == null) {
      throw new Error("Invoked addPosition on path " + path + " with Position" + position);
    }

    path.avgSpeed = this.calculateAverage(path.avgSpeed, position.coords.speed, path.getPositions().length);
    path.addPosition(position);
  }

  calculateAverage(oldAvg: number, newNum: number | null, oldCount: number) : number {
    if (newNum == null) return oldAvg; 
    return oldAvg + (newNum - oldAvg)/(oldCount+1);
  }
}
