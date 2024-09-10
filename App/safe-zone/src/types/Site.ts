export interface Restriction {
    days: string[];
    startHour: string;
    endHour: string;
}

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface Site {
    name: string;
    coordinates: Coordinate[];
    coordinatesrestriction: Coordinate[];
    tipesite: string;
}
  
  
  