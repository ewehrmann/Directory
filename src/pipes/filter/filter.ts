import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchNumber: any): any[] {
    if(!items) return [];
    if(!searchText) return items;
    console.log(searchText);
    console.log(searchNumber);
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.phone_user_name[0].split(" ")[searchNumber].toLowerCase().startsWith(searchText);
    });
   }
}
