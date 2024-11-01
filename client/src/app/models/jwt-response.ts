export interface JwtResponse {
    dataUser?: {
        id: number,
        username: string,
        password: string,
        accessToken: string,
        expiresIn: string
    };
}
