export interface Site {
    _id: string;
    name: string;
    coordinates: { lat: number; lng: number }[];
    radius: number;
    type: string;
    restriction: {
      days: string[];
      startHour: string;
      endHour: string;
    };
    coordinatesrestriction: { lat: number; lng: number }[];
  }
  
  export interface PolygonData {
    coordinates: [number, number][];
    color: string;
    siteId?: string;
  }
  