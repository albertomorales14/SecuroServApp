export interface Almacen {
    id: number,
    name: string,
    image: string,
    lat: number,
    long: number,
    ubicacion: string,
    size: string,
    tipo: string,
    capacidadMax: number,
    existencias: number,
    valor: number,
    comprado: boolean,
    userId: string
}