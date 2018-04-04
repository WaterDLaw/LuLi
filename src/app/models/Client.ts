/**
 * Fragen:
 * 
 * Was sind diese Nummern felder und sind es booleans (Sieht nach input option oder ratio aus)
 * 
 */

export interface Client{
    id :number,
    login :number,
    sprache :string,
    name :string,
    vorname :string,
    email :string,
    geburtstag :Date,
    diagnose :string,
    bemerkungen :string,
    groesse :number,
    strasse :string,
    plz :number,
    wohnort :string,
    geschlecht: string,
    todesdatum: Date,
    J40_44_j47: boolean,
    E84: boolean,
    J45: boolean,
    J60_70_J80_84: boolean,
    G47_G71_72_M40_41: boolean,
    J96_J98_99: boolean,
    J95: boolean,
    F4533_R05_09: boolean,
    telefon :number,
    closed: boolean,
    statistik: boolean

}