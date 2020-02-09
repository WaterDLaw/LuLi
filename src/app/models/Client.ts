/**
 * Fragen:
 * 
 * Was sind diese Nummern felder und sind es booleans (Sieht nach input option oder ratio aus)
 * 
 */

export interface Client{
    id?: number,
    created_at?: Date,
    sprache?: string,
    name?: string,
    vorname?: string,
    email?: string,
    geburtsdatum?: Date,
    diagnose_details?: string,
    bemerkungen?: string,
    groesse?: number,
    strasse?: string,
    plz?: number,
    wohnort?: string,
    geschlecht?: string,
    chronisch_obstruktive_Lungenkrankheit?: boolean,
    zystische_fibrose?: boolean,
    asthma_bronchiale?: boolean,
    interstitielle_lungenkrankheit?: boolean,
    thoraxwand_thoraxmuskelerkrankung?: boolean,
    andere_lungenkrankheit?: boolean,
    postoperative_lungenoperation?: boolean,
    funktionelle_atemstoerung?: boolean,
    telefon?: string,
    training_id?: number,
    status?: string,
    rauchstatus?: string,
    pneumologe?: string,
    pneumologist_id?: number,
    gewicht_before?: number,
    gewicht_after?: number,
    fevl_before?: number,
    fevl_after?: number,
    fevp_before?: number,
    fevp_after?: number,
    vkmaxl_before?: number,
    vkmaxl_after?: number,
    vkmaxp_before?: number,
    vkmaxp_after?: number,
    vo2max_before?: number,
    vo2max_after?: number,
    copdgold?:string,
    copdletter?:string,
    belastung?:string,
    sauerstoff_bei_belastung?:number,
    sao2?:number,
    trainingspuls?:string,
    Intervalttraining?:boolean,
    schweigepflicht?:boolean

}