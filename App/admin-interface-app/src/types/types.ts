export interface Site {
    _id: string;
    name: string;
    coordinates: { lat: number; lng: number }[];
    type: SiteType;
    coordinatesrestriction: { lat: number; lng: number }[];
  }
  
  export interface PolygonData {
    coordinates: [number, number][];
    color: string;
    siteId?: string;
  }

  export interface Restriction {
    days: string[];
    startHour: string;
    endHour: string;
  }
  
  export interface SiteType {
    name: string;
    radius: number;
    restriction: Restriction;
  }
  