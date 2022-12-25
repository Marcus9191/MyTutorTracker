import { Position } from "@capacitor/geolocation";
import { PathStatus } from "../enums/pathStatus";

/**
 * Represents a Path travelled by the user as a set of positions and an average speed
 */
export class Path {
  id: string;
  seconds: number;
  avgSpeed: number;
  status: PathStatus;
  private positions: Array<Position>;

  constructor(id: string) {
    this.id = id;
    this.seconds = 0;
    this.avgSpeed = 0;
    this.status = PathStatus.STARTED;
    this.positions = new Array<Position>();
  }

  private getPosition(targetStatus=PathStatus.RUNNING, first: boolean): Position | null {
    if (this.status != targetStatus) return null;
    else if (this.positions.length == 0) return null;
    else if (first === true) return this.positions[0];
    else return this.positions[this.positions.length -1];
  }

  addPosition(position: Position) {
    this.positions.push(position);
  }

  getPositions() : Array<Position> {
    return this.positions;
  }

  getStartPosition(): Position | null {
    return this.getPosition(PathStatus.STARTED, true);
  }

  getLastPosition(): Position | null {
    return this.getPosition(PathStatus.RUNNING, false);
  }

  getEndPosition(): Position | null {
    return this.getPosition(PathStatus.ENDED, false);
  }
}
