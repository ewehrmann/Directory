import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import xml2js from 'xml2js'; 
import { SearchProvider } from '../../providers/search/search'
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';

/**
Need to figure out how to make the value of employees$ an Array
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
  providers:[SearchProvider]
})

export class ResultsPage {
  
  employees$: SearchProvider[]
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public search: SearchProvider, private callNumber: CallNumber, private sms: SMS) {
    this.employees$ = [];
  }

  ionViewDidLoad(){
    var employees;
    this.search.getPresetEmployees()
     .subscribe(data => {
       employees = data.record;
        this.employees$ = employees;
        console.log (this.employees$);
    });
  }

  call(person_call) {
    this.callNumber.callNumber(person_call, true).then(()=>{
      console.log('successful')
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }

  sendSms(person_sms) {
    this.sms.send(person_sms, '').then(()=>{
      console.log('successful')
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }

}
