import { Component, Injector, ViewChild, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import 'rxjs/add/operator/map';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ResultsPage } from '../results/results';  
import { IfObservable } from 'rxjs/observable/IfObservable';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SearchProvider] 
})

export class HomePage {
  letter: string = '';
  firstButtonColor: string = '#00F';
  lastButtonColor: string = '#DCDCDC';
  nameToggle: number = 0;
  employees$: SearchProvider[]
  letters$: SearchProvider[]
  @ViewChild(Slides) slides: Slides;
   
  constructor(public navCtrl: NavController, public navParams: NavParams, public search: SearchProvider, private callNumber: CallNumber, private sms: SMS, private contacts: Contacts, public alertController: AlertController) {
    this.employees$ = [];
    this.letters$ = [];
  }

  ionViewDidLoad(){
    var letters;
    // load array of letters for filter search bar
    this.search.getLetters()
     .subscribe(data => {
       letters = data.record;
        this.letters$ = letters;
        console.log (this.letters$);
    });
    var employees;
    this.search.getPresetEmployees()
     .subscribe(data => {
       employees = data;
        this.employees$ = employees;
        console.log (this.employees$);
    });
  }

  presentAlert() {
    let addTodoAlert = this.alertController.create({
      title:"Contact Saved!",
      buttons: ['OK']
    })
    addTodoAlert.present()
   }

  call(person_call) {
    this.callNumber.callNumber(person_call, true).then(()=>{
      console.log('successful')
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }

  clearFilter() {
    this.letter = '';
  }

  filterList(letter) {
    // console.log(letter)
    this.letter = letter;
  }

  advanceSlides() {
    this.slides.slideTo(this.slides.getActiveIndex() + 9);
  }

  backupSlides() {
    this.slides.slideTo(this.slides.getActiveIndex() - 9);
  }

  toggleFirst() {
    this.firstButtonColor = '#00F';
    this.lastButtonColor = '#DCDCDC';
    this.nameToggle = 0;
    this.letter = '';
  }

  toggleLast() {
    this.lastButtonColor = '#00F';
    this.firstButtonColor = '#DCDCDC';
    this.nameToggle = 1;
    this.letter = '';
  }

saveContact(fullName, phoneNumber) {
  var first = fullName[0].split(" ")[0];
  var last = fullName[0].split(" ")[1];
  let contact: Contact = this.contacts.create();
  contact.name = new ContactName(null, first, last);
  contact.phoneNumbers = [new ContactField('mobile', phoneNumber)];
  contact.save().then(
  () => this.presentAlert(),
  (error: any) => console.error('Error saving contact.', error)
);
}

refreshData() {
  this.search.getEmployees()
     .subscribe(data => {
       this.employees$ = data;
       console.log (this.employees$);
    });
}

}
