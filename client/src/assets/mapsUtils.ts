import { environment } from "../environments/environment";

export const LAYER = {
    DARK_LAYER: environment.DARK_LAYER,
    HILL_SHADE_LAYER: environment.HILL_SHADE_LAYER
};


export const MARKER = {
    RED: {
        iconUrl: `${environment.CLOUDINARY_API_URL}/red-warehouse-marker_viryjb.png`,
        iconSize: [50, 40], // tamaño del icono
        popupAnchor: [0, 0] // posición del popup en relación al icono
    },
    RED_ACTIVE: {
        iconUrl: `${environment.CLOUDINARY_API_URL}/red-warehouse-marker_viryjb.png`,
        iconSize: [70, 60], // tamaño del icono
        popupAnchor: [0, 0] // posición del popup en relación al icono
    },
    GREEN: {
        iconUrl: `${environment.CLOUDINARY_API_URL}/green-warehouse-marker_crllsj.png`,
        iconSize: [50, 40], // tamaño del icono
        popupAnchor: [0, 0] // posición del popup en relación al icono
    },
    GREEN_ACTIVE: {
        iconUrl: `${environment.CLOUDINARY_API_URL}/green-warehouse-marker_crllsj.png`,
        iconSize: [70, 60], // tamaño del icono
        popupAnchor: [0, 0] // posición del popup en relación al icono
    },
    HOME: {
        iconUrl: `${environment.CLOUDINARY_API_URL}/home-marker_wnsiey.png`,
        iconSize: [45, 60], // tamaño del icono
        popupAnchor: [0, 0] // posición del popup en relación al icono
    }
};

export const COORDENADAS = {
    ALGECIRAS: [36.13326, -5.45051],
    SOUTHWEST: [36.05, -5.5],
    NORTHEAST: [36.21, -5.3],
    HOME: [36.11375740257908, -5.444353222846986],
    ALMACEN_1: [36.13326, -5.45051],
    ALMACEN_2: [36.145464550007205, -5.440292358398438],
    ALMACEN_3: [36.133420982256126, -5.440860986709596],
    ALMACEN_4: [36.131644616196645, -5.428705215454102],
    ALMACEN_5: [36.121817552706005, -5.433522462844849],
    ALMACEN_6: [],
    ALMACEN_7: [],
    ALMACEN_8: [],
    ALMACEN_9: [],
    ALMACEN_10: [],
    ALMACEN_11: [],
    ALMACEN_12: [],
    ALMACEN_13: [],
    ALMACEN_14: [],
    ALMACEN_15: [],
    ALMACEN_16: [],
    ALMACEN_17: [],
    ALMACEN_18: [],
    ALMACEN_19: [],
    ALMACEN_20: [],
};