export interface Training{
    id: number,
    startdatum: Date,
    enddatum: Date,
    sektion: number,
    typ: string,
    CRQSAS: number,
    SF36: number,
    CRDQ: number,
    Patientenfragebogen: boolean,
    sechsMin: boolean,
    ort: string,
    wann: string,
    CAT: number,
    closed: boolean,
    statistik: boolean,
    titel: string
}