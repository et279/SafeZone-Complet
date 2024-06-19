    export interface Restriction {
        days: string[];
        startHour: string;
        endHour: string;
    }
    export interface Coordinate {
        lat: number;
        lng: number;
    }
    export interface coordinatesrestriction {
        lat: number;
        lng: number;
    }

    export interface Zone {
        name: string;
        coordinates: Coordinate[];
        radius: number;
        type: 'Centro Educativo' | 'Ludoteca' | 'Centro Deportivo' | 'Zona Histórica' | 'Espacio Público' | 'Evento Público' | 'Evento Privado';
        restriction: Restriction;
        coordinatesrestriction: coordinatesrestriction[];
    }
  
  
  