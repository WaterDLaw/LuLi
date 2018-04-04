/**
 * 
 * Fragen:
 * 
 * Erklärung der Entität
 * 
 * durchegehen der Felder
 * 
 */

export interface Sektion{
    id: number,
    name: string,
    alias: string,
    ort: number,
    adminemail: string,
    sprache: string,
    login: number,
    logo: string,
    logowidth?: string,
    logoheight?: string,
    hatgewicht: boolean,
    hatalbumin: boolean,
    hatblutdruck: boolean,
    hathb: boolean,
    hatFEV1l: boolean,
    hatFEV1: boolean,
    hatVKI: boolean,
    hatVK: boolean,
    hattlc: boolean,
    hatnoexp: boolean,
    hatmip: boolean,
    hatvo2max: boolean,
    hatherzfrequenmax: boolean,
    hatmaxleistung: boolean,
    hatpo2: boolean,
    hatpco2: boolean,
    hatdco: boolean,
    hatdcova: boolean,
    hathbo2tiefst: boolean,
    hatsauerstoffdosis: boolean,
    hatborg: boolean,
    hathandgrip: boolean,
    hathbco: boolean,
    hatcotinin: boolean,
    hatsmokerlyzer: boolean,
    hatpackyears: boolean,
    hatinfektverschlechterungen: boolean,
    hatFEV1lnachbroncholyse: boolean,
    hatFEv1nachbroncholyse: boolean,
    hatVKlnachbroncholyse: boolean,
    hatVKnachbroncholyse: boolean,
    hatpco2unterbelastung: boolean,
    hatpo2unterbelastung: boolean,
    hatlactat: boolean,
    hatlogo: boolean

  
}