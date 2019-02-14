import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavParams } from 'ionic-angular';
import xml2js from 'xml2js';
import {Observable} from 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {
  search_value;

  constructor(public navParams: NavParams, private http: HttpClient, private file: File, private storage: Storage) {
    this.search_value = navParams.get('search_value');
    this.file = file;
    this.storage = storage;
  }

  getPresetEmployees(){
    return Observable.fromPromise(this.storage.get('employees')
        .then((res) => {
        let data;
        if (res != null && res != undefined) {
          data = res;
          return JSON.parse(data);
        }
        if (res == null || res == undefined) {
          const url = 'assets/employees.json';
          return this.http.get(url).map( res => {
            data = res;
            return data;
          })
        }
      })
    )
  }

  getEmployees() {
    const url = 'https://lduus9j7z3.execute-api.us-east-2.amazonaws.com/default/?name='
    const apiData = {};
    const httpOptions = {};
   // Call to Quickbase API for data
    return this.http.post(url, apiData, httpOptions).map( res => {
        console.log(res)
        var directorydata = <any>res["body"].qdbapi.record;
        // console.log('Test');
        this.storage.set('employees', JSON.stringify(directorydata));
        return directorydata;
      })     
 }

  getLetters(){
    const url = 'assets/letters.json';
    return this.http.get(url).map( res => {
      let data;
      data = res;
      return data;
    })
  }

  refreshData(){
    const url = 'https://lduus9j7z3.execute-api.us-east-2.amazonaws.com/default/?name=';
    const apiData = {};
    const httpOptions = {};
   // Call to Quickbase API for data
    return this.http.post(url, apiData, httpOptions).map( res => {
        var directorydata = <any>res["body"].qdbapi.record;
        console.log('Test');
        this.storage.set('employees', JSON.stringify(directorydata))
        return JSON.stringify(directorydata);
        });
  }

}
