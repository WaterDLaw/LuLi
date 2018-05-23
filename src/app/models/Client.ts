/**
 * Fragen:
 * 
 * Was sind diese Nummern felder und sind es booleans (Sieht nach input option oder ratio aus)
 * 
 */

export interface Client{
    id?: number,
    sprache?: string,
    name?: string,
    vorname?: string,
    email?: string,
    geburtstag?: Date,
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
    funktionelle_atemstörung?: boolean,
    telefon?: number,
    training_id?: number

}