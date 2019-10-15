import { Time } from "@angular/common";

// string instead of time for easy json strings

export interface Training{
    id: number,
    title: string,
    ort: string,
    start: Date,
    end: Date,
    spital: string,
    montag_start: string,
    montag_end: string,
    dienstag_start: string,
    dienstag_end: string,
    mittwoch_start: string,
    mittwoch_end: string,
    donnerstag_start: string,
    donnerstag_end: string,
    freitag_start: string,
    freitag_end: string,
    samstag_start: string,
    samstag_end: string,
    sonntag_start: string,
    sonntag_end: string,
    CRQ_SAS_bogen: boolean,
    SF_36_bogen: boolean,
    CRDQ_bogen: boolean,
    gehtest_bogen: boolean,
    feedback_bogen: boolean,
    COPD_bogen: boolean,
    belegt: boolean,
    max_anzahl: number
}