import { Injectable } from '@angular/core';
import { Client } from 'app/models/Client';
import { Messwerte } from 'app/models/Messwerte';
import * as Excel from "exceljs/dist/exceljs.min.js";
import { saveAs } from 'file-saver';
import { Training } from 'app/models/Training';
import { Cat } from "app/models/Cat";
import { Crqsas } from "app/models/Crqsas";
@Injectable()

/**
 * This Service uses the exceljs libary. The version that is used is 2.0.1 because the new 3.1.0 does not work with Angular 8 (Problems with Zone.js and a generated Promise)
 * https://github.com/angular/angular-cli/issues/14736
 * 
 */

export class ExcelService {




  constructor() { 

  }


  replaceUmlaute(str) {

        // define the umlaute
        const umlautMap = {
          '\u00dc': 'UE',
          '\u00c4': 'AE',
          '\u00d6': 'OE',
          '\u00fc': 'ue',
          '\u00e4': 'ae',
          '\u00f6': 'oe',
          '\u00df': 'ss',
        }

    return str
      .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
        const big = umlautMap[a.slice(0, 1)];
        return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
      })
      .replace(new RegExp('['+Object.keys(umlautMap).join('|')+']',"g"),
        (a) => umlautMap[a]
      );
  }

  async createExcelTrainings(data: any[], messwerte: any[], cat_vor: any[], cat_nach: any[], crq_vor: any[], crq_nach: any[]){

    console.log("INSIDE EXCEL TRIAING")

    console.log(data);
    console.log(messwerte);
    console.log(cat_vor);
    console.log(cat_nach);
    console.log(crq_vor);
    console.log(crq_nach);

    let wb = new Excel.Workbook()

    let wsPage = wb.addWorksheet('Patienteninformationen');



   

    // Headers
    wsPage.addRow(['Patienteninformationen']);
   
    wsPage.getCell("A1").font = {bold: true};
    wsPage.addRow(['']);
    //Headers für Blatt eins
    wsPage.addRow([
      'Kurs',
      'Vorname',
      'Name', 
      'Geburtsdatum',
      'Geschlecht',
      'Strasse',
      'PLZ',
      'Wohnort',
      'Telefon',
      'E-Mail',
      'Diagnose(n)',
      'Pneumolog/in',
      'Rauchstatus',
      'Status',
      /*
      'Grösse (m) vor',
      'Grösse (m) nach',
      'Gewicht (kg) vor',
      'Gewicht (kg) nach',
      'BMI (kg/m2) vor',
      'BMI (kg/m2) nach',
      'FEV1 (l) vor',
      'FEV1 (l) nach',
      'FEV1 (%Soll) vor',
      'FEV1 (%Soll) nach',
      'FVC (l) vor',
      'FVC (l) nach',
      'FVC (% Soll) vor',
      'FVC (% Soll) nach',
      'RV (l) vor',
      'RV (l) nach',
      'TLC (l) vor',
      'TLC (l) nach',
      'FEV/FVC (%) vor',
      'FEV/FVC (%) nach',
      'RV/TLC (%) vor',
      'RV/TLC (%) nach',
      'Distanz Meter (m) vor',
      'Distanz Meter (m) nach',
      'Distanz Meter (%Soll) vor',
      'Distanz Meter (%Soll) nach',
      'SaO2min (%) vor',
      'SaO2min (%) nach',
      'Max. Leistung (W) vor',
      'Max. Leistung (W) nach',
      'Max. Leistung (%Soll) vor',
      'Max. Leistung (%Soll) nach',
      'VO2max (l/m/kg) vor',
      'VO2max (l/m/kg) nach',
      'HFmax (/min) vor',
      'HFmax (/min) nach',
      'RR Syst. vor',
      'RR Syst. nach',
      'RR Diast. vor',
      'RR Diast. nach',
      'Dyspnoe (0-4) vor',
      'Dyspnoe (0-4) nach',
      'BODE-Score vor',
      'BODE-Score nach',
      'Dosis (l/min) vor',
      'Dosis (l/min) nach',
      'SaO2 (%) vor',
      'SaO2 (%) nach',
      'pH vor',
      'pH nach',
      'pO2 (mmHg) vor',
      'pO2 (mmHg) nach',
      'pCO2 (mmHg) vor',
      'pCO2 (mmHg) nach',
      'Bicarbonat (mmol/l) vor',
      'Bicarbonat (mmol/l) nach',
      'CAT vor',
      'CAT nach',
      'Dyspnoe vor',
      'Müdigkeit vor',
      'Gefühlslage vor',
      'Bewältigung vor',
      'Dyspnoe nach',
      'Müdigkeit nach',
      'Gefühlslage nach',
      'Bewältigung nach',
    */
    ])



    //loop over each array and creat a row
    for (var i = 0; i<data.length;i++){

      // strings that could containt umlaute
      
      if (data[i].name !== null) {
        var name = this.replaceUmlaute(data[i].name)
      }
      if (data[i].vorname !== null) {
        var vorname = this.replaceUmlaute(data[i].vorname)
      }
      if (data[i].strasse !== null) {
        var strasse = this.replaceUmlaute(data[i].strasse)
      }
      if (data[i].wohnort !== null) {
        var wohnort = this.replaceUmlaute(data[i].wohnort)
      }
      if (data[i].pneumologe !== null) {
        var pneumologe = this.replaceUmlaute(data[i].pneumologe)
      }
  
      //create row with data
      let Pgebdatum = new Date(data[i].geburtsdatum)
      let gebdate = Pgebdatum.getDate() + "." + (Pgebdatum.getMonth()+1) + "." + Pgebdatum.getFullYear()
      let diagnosen = "";
  
      if(data[i].chronisch_obstruktive_Lungenkrankheit){
        diagnosen = diagnosen  + "COPD " +data[i].copdgold + "/" + data[i].copdletter + ", "
      }
      if(data[i].zystische_fibrose){
        diagnosen = diagnosen + "Zystische Fibrose" + ", "
      }
      if(data[i].asthma_bronchiale){
        diagnosen = diagnosen + "Asthma bronchiale" + ", "
      }
      if(data[i].interstitielle_lungenkrankheit){
        diagnosen = diagnosen +  "Interstitielle Lungenkrankheit" + ", "
      }
      if(data[i].thoraxwand_thoraxmuskelerkrankung){
        diagnosen = diagnosen +  "Thorwaxwand- und Thoraxmuskelerkrankung" + ", "
      }
      if(data[i].andere_lungenkrankheit){
        diagnosen = diagnosen + + "Andere Lungenkrankheit" + ", "
      }
      if(data[i].postoperative_lungenoperation){
        diagnosen = diagnosen +  "Prä- und postoperative Lungenoperation" + ", "
      }
      if(data[i].funktionelle_atemstoerung){
        diagnosen = diagnosen + "Funktionelle Atemstörung" + ", "
      }

      //Data für Blatt eins
      wsPage.addRow([
        data[i].title,
        vorname,
        name, 
        gebdate,
        data[i].geschlecht,
        strasse,
        data[i].plz,
        wohnort,
        data[i].telefon,
        data[i].email,
        diagnosen,
        pneumologe,
        data[i].rauchstatus,
        data[i].status,
        /*
        messwerte[i].groesse_vor,
        messwerte[i].groesse_nach,
        messwerte[i].gewicht_vor,
        messwerte[i].gewicht_nach,
        messwerte[i].bmi_vor,
        messwerte[i].bmi_nach,
        messwerte[i].fev1l_vor,
        messwerte[i].fev1l_nach,
        messwerte[i].fev1soll_vor,
        messwerte[i].fev1soll_nach,
        messwerte[i].fvc_vor,
        messwerte[i].fvc_nach,
        messwerte[i].fvc_soll_vor,
        messwerte[i].fvc_soll_nach,
        messwerte[i].rv_vor,
        messwerte[i].rv_nach,
        messwerte[i].tlc_vor,
        messwerte[i].tlc_nach,
        messwerte[i].fev1_fvc_vor,
        messwerte[i].fev1_fvc_nach,
        messwerte[i].rv_tlc_vor,
        messwerte[i].rv_tlc_nach,
        messwerte[i].distanzM_vor,
        messwerte[i].distanzM_nach,
        messwerte[i].distanzS_vor,
        messwerte[i].distanzS_nach,
        messwerte[i].saO2min_vor,
        messwerte[i].saO2min_nach,
        messwerte[i].max_leistungW_vor,
        messwerte[i].max_leistungW_nach,
        messwerte[i].max_leistungS_vor,
        messwerte[i].max_leistungS_nach,
        messwerte[i].vO2max_vor,
        messwerte[i].vO2max_nach,
        messwerte[i].hfmax_vor,
        messwerte[i].hfmax_nach,
        messwerte[i].rr_syst_vor,
        messwerte[i].rr_syst_nach,
        messwerte[i].rr_diast_vor,
        messwerte[i].rr_diast_nach,
        messwerte[i].dyspnoe_vor,
        messwerte[i].dyspnoe_nach,
        messwerte[i].bodescore_vor,
        messwerte[i].bodescore_nach,
        messwerte[i].O2_Dosis_vor,
        messwerte[i].O2_Dosis_nach,
        messwerte[i].saO2_vor,
        messwerte[i].saO2_nach,
        messwerte[i].phwert_vor,
        messwerte[i].phwert_nach,
        messwerte[i].pO2_vor,
        messwerte[i].pO2_nach,
        messwerte[i].pC02_vor,
        messwerte[i].pC02_nach,
        messwerte[i].bicarbonat_vor,
        messwerte[i].bicarbonat_nach,
   
        cat_vor[i].gesamtpunktzahl,
        cat_nach[i].gesamtpunktzahl,
        
        crq_vor[i].dyspnoe,
        crq_vor[i].fatique,
        crq_vor[i].emotion,
        crq_vor[i].mastery,
        crq_nach[i].dyspnoe,
        crq_nach[i].fatique,
        crq_nach[i].emotion,
        crq_nach[i].mastery
        */
      ])



    }

    let buf = await wb.xlsx.writeBuffer()
    
    //saveAs(new Blob([buf]), 'abc.xlsx');
    return buf;


  }

  async createExcelStatistic(data: any[], cat_vor: any[], cat_nach: any[], crq_vor: any[], crq_nach: any[]){

    let wb = new Excel.Workbook()

    let wsPage = wb.addWorksheet('Patienteninformationen');


    // Headers
    wsPage.addRow(['Patienteninformationen']);
   
    wsPage.getCell("A1").font = {bold: true};
    wsPage.addRow(['']);
    //Headers für Blatt eins
    wsPage.addRow([
      'Kurs',
      'Vorname',
      'Name', 
      'Geburtsdatum',
      'Geschlecht',
      'Strasse',
      'PLZ',
      'Wohnort',
      'Telefon',
      'E-Mail',
      'Diagnose(n)',
      'Pneumolog/in',
      'Rauchstatus',
      'Status',
      'Grösse (m) vor',
      'Grösse (m) nach',
      'Gewicht (kg) vor',
      'Gewicht (kg) nach',
      'BMI (kg/m2) vor',
      'BMI (kg/m2) nach',
      'FEV1 (l) vor',
      'FEV1 (l) nach',
      'FEV1 (%Soll) vor',
      'FEV1 (%Soll) nach',
      'FVC (l) vor',
      'FVC (l) nach',
      'FVC (% Soll) vor',
      'FVC (% Soll) nach',
      'RV (l) vor',
      'RV (l) nach',
      'TLC (l) vor',
      'TLC (l) nach',
      'FEV/FVC (%) vor',
      'FEV/FVC (%) nach',
      'RV/TLC (%) vor',
      'RV/TLC (%) nach',
      'Distanz Meter (m) vor',
      'Distanz Meter (m) nach',
      'Distanz Meter (%Soll) vor',
      'Distanz Meter (%Soll) nach',
      'SaO2min (%) vor',
      'SaO2min (%) nach',
      'Max. Leistung (W) vor',
      'Max. Leistung (W) nach',
      'Max. Leistung (%Soll) vor',
      'Max. Leistung (%Soll) nach',
      'VO2max (l/m/kg) vor',
      'VO2max (l/m/kg) nach',
      'HFmax (/min) vor',
      'HFmax (/min) nach',
      'RR Syst. vor',
      'RR Syst. nach',
      'RR Diast. vor',
      'RR Diast. nach',
      'Dyspnoe (0-4) vor',
      'Dyspnoe (0-4) nach',
      'BODE-Score vor',
      'BODE-Score nach',
      'Dosis (l/min) vor',
      'Dosis (l/min) nach',
      'SaO2 (%) vor',
      'SaO2 (%) nach',
      'pH vor',
      'pH nach',
      'pO2 (mmHg) vor',
      'pO2 (mmHg) nach',
      'pCO2 (mmHg) vor',
      'pCO2 (mmHg) nach',
      'Bicarbonat (mmol/l) vor',
      'Bicarbonat (mmol/l) nach',
      'CAT vor',
      'CAT nach',
      'Dyspnoe vor',
      'Müdigkeit vor',
      'Gefühlslage vor',
      'Bewältigung vor',
      'Dyspnoe nach',
      'Müdigkeit nach',
      'Gefühlslage nach',
      'Bewältigung nach',
    
    ])



    //loop over each array and creat a row
    for (var i = 0; i<data.length;i++){


      //create row with data
      let Pgebdatum = new Date(data[i].geburtsdatum)
      let gebdate = Pgebdatum.getDate() + "." + (Pgebdatum.getMonth()+1) + "." + Pgebdatum.getFullYear()
      let diagnosen = "";
  
      // strings that could containt umlaute
      if (data[i].name !== null) {
        var name = this.replaceUmlaute(data[i].name)
      }
      if (data[i].vorname !== null) {
        var vorname = this.replaceUmlaute(data[i].vorname)
      }
      if (data[i].strasse !== null) {
        var strasse = this.replaceUmlaute(data[i].strasse)
      }
      if (data[i].wohnort !== null) {
        var wohnort = this.replaceUmlaute(data[i].wohnort)
      }
      if (data[i].pneumologe !== null) {
        var pneumologe = this.replaceUmlaute(data[i].pneumologe)
      }


      if(data[i].chronisch_obstruktive_Lungenkrankheit){
        diagnosen = diagnosen  + "COPD " +data[i].copdgold + "/" + data[i].copdletter + ", "
      }
      if(data[i].zystische_fibrose){
        diagnosen = diagnosen + "Zystische Fibrose" + ", "
      }
      if(data[i].asthma_bronchiale){
        diagnosen = diagnosen + "Asthma bronchiale" + ", "
      }
      if(data[i].interstitielle_lungenkrankheit){
        diagnosen = diagnosen +  "Interstitielle Lungenkrankheit" + ", "
      }
      if(data[i].thoraxwand_thoraxmuskelerkrankung){
        diagnosen = diagnosen +  "Thorwaxwand- und Thoraxmuskelerkrankung" + ", "
      }
      if(data[i].andere_lungenkrankheit){
        diagnosen = diagnosen + + "Andere Lungenkrankheit" + ", "
      }
      if(data[i].postoperative_lungenoperation){
        diagnosen = diagnosen +  "Prä- und postoperative Lungenoperation" + ", "
      }
      if(data[i].funktionelle_atemstoerung){
        diagnosen = diagnosen + "Funktionelle Atemstörung" + ", "
      }

      //Data für Blatt eins
      wsPage.addRow([
        data[i].training,
        data[i].vorname,
        data[i].name, 
        gebdate,
        data[i].geschlecht,
        data[i].strasse,
        data[i].plz,
        data[i].wohnort,
        data[i].telefon,
        data[i].email,
        diagnosen,
        data[i].rauchstatus,
        data[i].status,
        pneumologe,
        data[i].groesse_vor,
        data[i].groesse_nach,
        data[i].gewicht_vor,
        data[i].gewicht_nach,
        data[i].bmi_vor,
        data[i].bmi_nach,
        data[i].fev1l_vor,
        data[i].fev1l_nach,
        data[i].fev1soll_vor,
        data[i].fev1soll_nach,
        data[i].fvc_vor,
        data[i].fvc_nach,
        data[i].fvc_soll_vor,
        data[i].fvc_soll_nach,
        data[i].rv_vor,
        data[i].rv_nach,
        data[i].tlc_vor,
        data[i].tlc_nach,
        data[i].fev1_fvc_vor,
        data[i].fev1_fvc_nach,
        data[i].rv_tlc_vor,
        data[i].rv_tlc_nach,
        data[i].distanzM_vor,
        data[i].distanzM_nach,
        data[i].distanzS_vor,
        data[i].distanzS_nach,
        data[i].saO2min_vor,
        data[i].saO2min_nach,
        data[i].max_leistungW_vor,
        data[i].max_leistungW_nach,
        data[i].max_leistungS_vor,
        data[i].max_leistungS_nach,
        data[i].vO2max_vor,
        data[i].vO2max_nach,
        data[i].hfmax_vor,
        data[i].hfmax_nach,
        data[i].rr_syst_vor,
        data[i].rr_syst_nach,
        data[i].rr_diast_vor,
        data[i].rr_diast_nach,
        data[i].dyspnoe_vor,
        data[i].dyspnoe_nach,
        data[i].bodescore_vor,
        data[i].bodescore_nach,
        data[i].O2_Dosis_vor,
        data[i].O2_Dosis_nach,
        data[i].saO2_vor,
        data[i].saO2_nach,
        data[i].phwert_vor,
        data[i].phwert_nach,
        data[i].pO2_vor,
        data[i].pO2_nach,
        data[i].pC02_vor,
        data[i].pC02_nach,
        data[i].bicarbonat_vor,
        data[i].bicarbonat_nach,
   
        cat_vor[i].gesamtpunktzahl,
        cat_nach[i].gesamtpunktzahl,
        
        crq_vor[i].dyspnoe,
        crq_vor[i].fatique,
        crq_vor[i].emotion,
        crq_vor[i].mastery,
        crq_nach[i].dyspnoe,
        crq_nach[i].fatique,
        crq_nach[i].emotion,
        crq_nach[i].mastery
        
      ])



    }

    let buf = await wb.xlsx.writeBuffer()
    
    //saveAs(new Blob([buf]), 'abc.xlsx');
    return buf;

  }


  async createExcelInformation(patient:Client, messwerte: Messwerte, cat_vor: Cat, cat_nach:Cat, crq_vor: Crqsas, crq_nach:Crqsas, training?: String){

    let wb = new Excel.Workbook()
    
    // Create the pation informationsrow
    let wsPatient = wb.addWorksheet('Patienteninformationen');

    // Everything should be in one row


    // Headers
    wsPatient.addRow(['Patienteninformationen']);

    
    wsPatient.getCell("A1").font = {bold: true};
    wsPatient.addRow(['']);

    let Pgebdatum = new Date(patient.geburtsdatum)
    let gebdate = Pgebdatum.getDate() + "." + (Pgebdatum.getMonth()+1) + "." + Pgebdatum.getFullYear()
    let diagnosen = "";

    if(patient.chronisch_obstruktive_Lungenkrankheit){
      diagnosen = diagnosen  + "COPD " +patient.copdgold + "/" + patient.copdletter + ", "
    }
    if(patient.zystische_fibrose){
      diagnosen = diagnosen + "Zystische Fibrose" + ", "
    }
    if(patient.asthma_bronchiale){
      diagnosen = diagnosen + "Asthma bronchiale" + ", "
    }
    if(patient.interstitielle_lungenkrankheit){
      diagnosen = diagnosen +  "Interstitielle Lungenkrankheit" + ", "
    }
    if(patient.thoraxwand_thoraxmuskelerkrankung){
      diagnosen = diagnosen +  "Thorwaxwand- und Thoraxmuskelerkrankung" + ", "
    }
    if(patient.andere_lungenkrankheit){
      diagnosen = diagnosen + + "Andere Lungenkrankheit" + ", "
    }
    if(patient.postoperative_lungenoperation){
      diagnosen = diagnosen +  "Prä- und postoperative Lungenoperation" + ", "
    }
    if(patient.funktionelle_atemstoerung){
      diagnosen = diagnosen + "Funktionelle Atemstörung" + ", "
    }

    //Headers für Blatt eins
    wsPatient.addRow([
      'Kurs',
      'Vorname',
      'Name', 
      'Geburtsdatum',
      'Geschlecht',
      'Strasse',
      'PLZ',
      'Wohnort',
      'Telefon',
      'E-Mail',
      'Diagnose(n)',
      'Pneumolog/in',
      'Rauchstatus',
      'Status',
      'Grösse (m) vor',
      'Grösse (m) nach',
      'Gewicht (kg) vor',
      'Gewicht (kg) nach',
      'BMI (kg/m2) vor',
      'BMI (kg/m2) nach',
      'FEV1 (l) vor',
      'FEV1 (l) nach',
      'FEV1 (%Soll) vor',
      'FEV1 (%Soll) nach',
      'FVC (l) vor',
      'FVC (l) nach',
      'FVC (% Soll) vor',
      'FVC (% Soll) nach',
      'RV (l) vor',
      'RV (l) nach',
      'TLC (l) vor',
      'TLC (l) nach',
      'FEV/FVC (%) vor',
      'FEV/FVC (%) nach',
      'RV/TLC (%) vor',
      'RV/TLC (%) nach',
      'Distanz Meter (m) vor',
      'Distanz Meter (m) nach',
      'Distanz Meter (%Soll) vor',
      'Distanz Meter (%Soll) nach',
      'SaO2min (%) vor',
      'SaO2min (%) nach',
      'Max. Leistung (W) vor',
      'Max. Leistung (W) nach',
      'Max. Leistung (%Soll) vor',
      'Max. Leistung (%Soll) nach',
      'VO2max (l/m/kg) vor',
      'VO2max (l/m/kg) nach',
      'HFmax (/min) vor',
      'HFmax (/min) nach',
      'RR Syst. vor',
      'RR Syst. nach',
      'RR Diast. vor',
      'RR Diast. nach',
      'Dyspnoe (0-4) vor',
      'Dyspnoe (0-4) nach',
      'BODE-Score vor',
      'BODE-Score nach',
      'Dosis (l/min) vor',
      'Dosis (l/min) nach',
      'SaO2 (%) vor',
      'SaO2 (%) nach',
      'pH vor',
      'pH nach',
      'pO2 (mmHg) vor',
      'pO2 (mmHg) nach',
      'pCO2 (mmHg) vor',
      'pCO2 (mmHg) nach',
      'Bicarbonat (mmol/l) vor',
      'Bicarbonat (mmol/l) nach',
      'CAT vor',
      'CAT nach',
      'Dyspnoe vor',
      'Müdigkeit vor',
      'Gefühlslage vor',
      'Bewältigung vor',
      'Dyspnoe nach',
      'Müdigkeit nach',
      'Gefühlslage nach',
      'Bewältigung nach',
    
    ])

    // Have to check if it is 0 or not cat
    var cat_vor_gesamt
    if (cat_vor !== null){
      console.log("CAT NULLLLL")
      cat_vor_gesamt = ""
    }else{
      cat_vor_gesamt = cat_vor.gesamtpunktzahl
    }

    var cat_nach_gesamt
    if (cat_nach !== null){
      console.log("CAT NULLLLL")
      cat_nach_gesamt = ""
    }else{
      cat_nach_gesamt = cat_nach.gesamtpunktzahl
    }

    // Have to check if it is 0 or not crq


    var crq_vor_dyspnoe
    var crq_vor_fatique
    var crq_vor_emotion
    var crq_vor_mastery
    if(crq_vor !== null){
      crq_vor_dyspnoe = ""
      crq_vor_fatique = ""
      crq_vor_emotion = ""
      crq_vor_mastery = ""
    }else{
      crq_vor_dyspnoe = crq_vor.dyspnoe
      crq_vor_fatique = crq_vor.fatique
      crq_vor_emotion = crq_vor.emotion
      crq_vor_mastery = crq_vor.mastery
    }


    var crq_nach_dyspnoe
    var crq_nach_fatique
    var crq_nach_emotion
    var crq_nach_mastery
    if(crq_nach !== null){
      crq_nach_dyspnoe = ""
      crq_nach_fatique = ""
      crq_nach_emotion = ""
      crq_nach_mastery = ""
    }else{
      crq_nach_dyspnoe = crq_nach.dyspnoe
      crq_nach_fatique = crq_nach.fatique
      crq_nach_emotion = crq_nach.emotion
      crq_nach_mastery = crq_nach.mastery
    }

    //Data für Blatt eins
    wsPatient.addRow([
      training,
      patient.vorname,
      patient.name, 
      gebdate,
      patient.geschlecht,
      patient.strasse,
      patient.plz,
      patient.wohnort,
      patient.telefon,
      patient.email,
      diagnosen,
      patient.rauchstatus,
      patient.status,
      patient.pneumologe,
      messwerte.groesse_vor,
      messwerte.groesse_nach,
      messwerte.gewicht_vor,
      messwerte.gewicht_nach,
      messwerte.bmi_vor,
      messwerte.bmi_nach,
      messwerte.fev1l_vor,
      messwerte.fev1l_nach,
      messwerte.fev1soll_vor,
      messwerte.fev1soll_nach,
      messwerte.fvc_vor,
      messwerte.fvc_nach,
      messwerte.fvc_soll_vor,
      messwerte.fvc_soll_nach,
      messwerte.rv_vor,
      messwerte.rv_nach,
      messwerte.tlc_vor,
      messwerte.tlc_nach,
      messwerte.fev1_fvc_vor,
      messwerte.fev1_fvc_nach,
      messwerte.rv_tlc_vor,
      messwerte.rv_tlc_nach,
      messwerte.distanzM_vor,
      messwerte.distanzM_nach,
      messwerte.distanzS_vor,
      messwerte.distanzS_nach,
      messwerte.saO2min_vor,
      messwerte.saO2min_nach,
      messwerte.max_leistungW_vor,
      messwerte.max_leistungW_nach,
      messwerte.max_leistungS_vor,
      messwerte.max_leistungS_nach,
      messwerte.vO2max_vor,
      messwerte.vO2max_nach,
      messwerte.hfmax_vor,
      messwerte.hfmax_nach,
      messwerte.rr_syst_vor,
      messwerte.rr_syst_nach,
      messwerte.rr_diast_vor,
      messwerte.rr_diast_nach,
      messwerte.dyspnoe_vor,
      messwerte.dyspnoe_nach,
      messwerte.bodescore_vor,
      messwerte.bodescore_nach,
      messwerte.O2_Dosis_vor,
      messwerte.O2_Dosis_nach,
      messwerte.saO2_vor,
      messwerte.saO2_nach,
      messwerte.phwert_vor,
      messwerte.phwert_nach,
      messwerte.pO2_vor,
      messwerte.pO2_nach,
      messwerte.pC02_vor,
      messwerte.pC02_nach,
      messwerte.bicarbonat_vor,
      messwerte.bicarbonat_nach,
      cat_vor_gesamt,
      cat_nach_gesamt,
      crq_vor_dyspnoe,
      crq_vor_fatique,
      crq_vor_emotion,
      crq_vor_mastery,
      crq_nach_dyspnoe,
      crq_nach_fatique,
      crq_nach_emotion,
      crq_nach_mastery
    ])

    /*
    wsPatient.addRow(['Name:', patient.name]);
    wsPatient.addRow(['Email:', patient.email]);
    wsPatient.addRow(['Geburtsdatum:', new Date(patient.geburtsdatum)]);
    wsPatient.addRow(['Groesse:', patient.groesse]);
    wsPatient.addRow(['Geschlecht:', patient.geschlecht]);
    wsPatient.addRow(['Telefon:', patient.telefon]);
    wsPatient.addRow(['Strasse:', patient.strasse]);
    wsPatient.addRow(['PLZ:', patient.plz]);
    wsPatient.addRow(['Wohnort:', patient.wohnort]);
    wsPatient.addRow(['Chronische Obstruktive Lungenkrankheit:', patient.chronisch_obstruktive_Lungenkrankheit]);
    wsPatient.addRow(['Zystische Fibrose:', patient.zystische_fibrose]);
    wsPatient.addRow(['Asthma Bronchiale:', patient.asthma_bronchiale]);
    wsPatient.addRow(['Interstitielle Lungenkrankheit:', patient.interstitielle_lungenkrankheit]);
    wsPatient.addRow(['Thoraxwand Thoraxmuskelerkrankung:', patient.thoraxwand_thoraxmuskelerkrankung]);
    wsPatient.addRow(['Andere Lungenkrankheit:', patient.andere_lungenkrankheit]);
    wsPatient.addRow(['Postoperative Lungenoperation:', patient.postoperative_lungenoperation]);
    wsPatient.addRow(['Funktionelle Atemstoerung:', patient.funktionelle_atemstoerung]);
    wsPatient.addRow(['Rauchstatus:', patient.rauchstatus]);
    wsPatient.addRow(['Status:', patient.status]);

    //Set width of the 2 columsn
    wsPatient.getColumn("A").width = 45;
    wsPatient.getColumn("B").width = 20;
    wsPatient.getColumn("B").alignment = { horizontal: 'left' };
    // Messwerte Worksheet
    let wsMesswerte = wb.addWorksheet('Messwerte');

    wsMesswerte.addRow('Messwerte')
    wsMesswerte.getCell("A1").font = {bold: true};
    wsMesswerte.addRow('');
    wsMesswerte.addRow("Allgemeine Daten");
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["Groesse (m)", messwerte[0].groesse_vor, messwerte[0].groesse_nach]);
    wsMesswerte.addRow(["Gewicht (kg)", messwerte[0].gewicht_before, messwerte[0].gewicht_nach]);
    wsMesswerte.addRow(["BMI (kg/m2)", messwerte[0].bmi_vor, messwerte[0].bmi_nach]);
    wsMesswerte.addRow('');
    wsMesswerte.addRow("Spirometrie");
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["FEV1 (l)", messwerte[0].fev1_vor, messwerte[0].fev1_nach]);
    wsMesswerte.addRow(["FEV1 (%Soll)", messwerte[0].fev1soll_vor, messwerte[0].fev1soll_nach]);
    wsMesswerte.addRow(["FVC (l)", messwerte[0].fvc_vor, messwerte[0].fvc_nach])
    wsMesswerte.addRow(["RV (l)", messwerte[0].rv_vor,messwerte[0].rv_nach])
    wsMesswerte.addRow(["TLC (l)", messwerte[0].tlc_vor, messwerte[0].tlc_nach])
    wsMesswerte.addRow(["FEV/FVC (%)", messwerte[0].fev1_fvc_vor, messwerte[0].fev1_fvc_nach])
    wsMesswerte.addRow(["RV/TLC (%)", messwerte[0].rv_tlc_vor, messwerte[0].rv_tlc_nach]);
    wsMesswerte.addRow("");
    wsMesswerte.addRow("6-Minuten-Gehtest");
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["Distanz Meter (m)", messwerte[0].distanzM_vor, messwerte[0].distanzM_nach])
    wsMesswerte.addRow(["Distanz Meter (%Soll)", messwerte[0].distanzS_vor, messwerte[0].distanzS_nach])
    wsMesswerte.addRow(["SaO2min (%)", messwerte[0].saO2_vor, messwerte[0].saO2_nach])
    wsMesswerte.addRow("");
    wsMesswerte.addRow("Belastung");
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["Max. Leistung (W)", messwerte[0].max_leistungW_vor, messwerte[0].max_leistungW_nach])
    wsMesswerte.addRow(["Max. Leistung (%Soll)", messwerte[0].max_leistungS_vor, messwerte[0].max_leistungS_nach]);
    wsMesswerte.addRow(["VO2max (l/m/kg)", messwerte[0].vo2max_before, messwerte[0].vo2max_after]);
    wsMesswerte.addRow(["HFmax (/min)", messwerte[0].hfmax_vor, messwerte[0].hfmax_nach])
    wsMesswerte.addRow("")
    wsMesswerte.addRow("Dyspnoe - MMRC-Score")
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["Dyspnoe (0-4)", messwerte[0].dyspnoe_vor, messwerte[0].dyspnoe_nach])
    wsMesswerte.addRow("")
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["BODE-Score", messwerte[0].bodescore_vor, messwerte[0].bodescore_nach])
    wsMesswerte.addRow("");
    wsMesswerte.addRow("Arterielle Blutgase")
    wsMesswerte.addRow(["","Vor dem Training", "Nach dem Training"]);
    wsMesswerte.addRow(["Dosis (l/min)", messwerte[0].O2_Dosis_vor, messwerte[0].O2_Dosis_nach])
    wsMesswerte.addRow(["SaO2 (%)", messwerte[0].saO2_vor, messwerte[0].saO2_nach])
    wsMesswerte.addRow(["pH", messwerte[0].phwert_vor, messwerte[0].phwert_nach])
    wsMesswerte.addRow(["pO2 (mmHg)", messwerte[0].pO2_vor, messwerte[0].pO2_nach])
    wsMesswerte.addRow(["pCO2 (mmHg)", messwerte[0].pC02_vor, messwerte[0].pC02_nach])
    wsMesswerte.addRow(["Bicarbonat (mmol/l)", messwerte[0].bicarbonat_vor,messwerte[0].bicarbonat_nach])

  */
    let buf = await wb.xlsx.writeBuffer()
    
    //saveAs(new Blob([buf]), 'abc.xlsx');
    return buf;
  }
  

}
