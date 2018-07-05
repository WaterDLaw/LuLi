import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'statistikFilter'
})

@Injectable()
export class StatistikPipe implements PipeTransform {
    transform(items: any[], geschlecht?: string, ort?:string, kurs?:string, status?:string, jahr?:string, diagnose?:string): any[] {

        let tempGeschlecht: any[] = [];
        let tempOrt: any[] = [];
        let tempKurs: any[] =[]
        let tempStatus: any[] = [];
        let tempJahr: any[] = [];
        let tempDiagnose: any[] = [];

        let temp: any[] = [];

        //Check Geschlecht

        console.log(geschlecht);
        if (!items) {
            return [];
        }else{

            // Check Geschlecht
            if(geschlecht != null){
                if(geschlecht != "alle"){
                    for (let i = 0; i<items.length; i++){
                        console.log(items[i].geschlecht);
                        if(items[i].geschlecht == geschlecht){
                            
                            tempGeschlecht.push(items[i]);
                            
                        }
                
                    }
                }else{
                    tempGeschlecht = items;
                    console.log(tempGeschlecht);
                }
            }else{
                tempGeschlecht = items;
                console.log(tempGeschlecht);
            }
            

            // Check Spital
            if(ort != null){
                if(ort != "alle"){

                    for (let i = 0; i<tempGeschlecht.length; i++){
                        console.log(tempGeschlecht[i].ort);
                        // Null check
                        if(tempGeschlecht[i].ort != null){
                            if(tempGeschlecht[i].ort == ort){
                            
                                tempOrt.push(tempGeschlecht[i]);
                                
                            }
                        }
                        
                
                    }
                }else{
                    tempOrt = tempGeschlecht;
                }
    
            }else{
                tempOrt = tempGeschlecht;
            }
           
            // Check Kurs
            if(kurs != null){
                if(kurs != "alle"){
                    for (let i = 0; i<tempOrt.length; i++){
                        
                        // Null check
                        if(tempOrt[i].start != null){
                            let start = new Date(tempOrt[i].start.toString().replace('-','/'));
                            console.log(start.getMonth()+1);
                            if((start.getMonth()+1) == +kurs){
                                
                                tempKurs.push(tempOrt[i]);
                                
                            }
                        }
                    }
                }else{
                    tempKurs = tempOrt;
                }
            }else{
                tempKurs = tempOrt;
            }
           

            // Kursteilnehmer
            if(status != null){
                if(status != "alle"){
                    for (let i = 0; i<tempKurs.length; i++){
                        
                        // Null check
                        if(tempKurs[i].start != null){
    
                            console.log(tempKurs[i].status);
                            if(tempKurs[i].status == status){
                                
                                tempStatus.push(tempKurs[i]);
                                
                            }
                        }
                    }
                }else{
                    tempStatus = tempKurs;
                }
            }else{
                tempStatus = tempKurs;
            }
            

            // Jahr
            if(jahr != null){
                if(jahr != "alle"){
                    for (let i = 0; i<tempStatus.length; i++){
                        
                        // Null check
                        console.log("year");
                        if(tempStatus[i].geburtsdatum != null){
                            let jahrConv = new Date(tempStatus[i].geburtsdatum.toString().replace('-','/'));
                            console.log(jahrConv.getFullYear());
                            if((jahrConv.getFullYear()) == +jahr){
                                
                                tempJahr.push(tempStatus[i]);
                                
                            }
                        }
                    }
                }else{
                    tempJahr = tempStatus;
                }
            }else{
                tempJahr = tempStatus;
            }

            // Diagnose
            if(diagnose != null){
                if(diagnose != "alle"){
                    for (let i = 0; i<tempJahr.length; i++){
                        
                        // check diagnose string

                        switch (diagnose) {
                            case "Chronisch obstruktive Lungenkrankheit":
                                if(tempJahr[i].chronisch_obstruktive_Lungenkrankheit == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }                                
                                break;
                            
                            case "Zystische Fibrose":
                                if(tempJahr[i].zystische_fibrose == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }         
                                break;

                            case "Asthma bronchiale":
                                if(tempJahr[i].asthma_bronchiale == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }     
                                break;

                            case "Interstitielle Lungenkrankheit":
                                if(tempJahr[i].interstitielle_lungenkrankheit == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }  
                                break;

                            case "Thoraxwand- und Thoraxmuskelerkrankung":
                                if(tempJahr[i].thoraxwand_thoraxmuskelerkrankung == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }  
                                break;

                            case "Andere Lungenkrankheit":
                                if(tempJahr[i].andere_lungenkrankheit == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }  
                                break;
                            
                            case "Prä- und postoperative Lungenoperation":
                                if(tempJahr[i].postoperative_lungenoperation == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }  
                                break;

                            case "Funktionelle Atemstörung":
                                if(tempJahr[i].funktionelle_atemstoerung == 1){
                                    tempDiagnose.push(tempJahr[i]);
                                }  
                                break;

                            default: 
                                break;
                        }
                    }
                }else{
                    tempDiagnose = tempJahr;
                }
            }else{
                tempDiagnose = tempJahr;
            }

        }
        console.log(temp);

        temp = tempDiagnose;
        

        return temp;
    }
}