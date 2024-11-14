import { environment } from "../environments/environment";

export const LAYER = {
    DARK_LAYER: environment.DARK_LAYER,
    HILL_SHADE_LAYER: environment.HILL_SHADE_LAYER,
    OPEN_STREET_MAP: environment.OPEN_STREET_MAP,
    OPEN_STREET_MAP_HOT: environment.OPEN_STREET_MAP_HOT,
    GRID_MAP: environment.GRID_MAP
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
    ALGECIRAS: [36.13286641375452, -5.450420379638673],
    SOUTHWEST: [36.05735655797715, -5.577621459960938],
    NORTHEAST: [36.22031843767506, -5.328712463378907],
    HOME: [36.11375740257908, -5.444353222846986],
    ALMACEN_1: [36.13294873276415, -5.45047402381897],
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
    ALMACEN_20: [36.1369779261034, -5.444836020469666],
};