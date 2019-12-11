import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set("user-key", "3f61963b3c7bd5dc68215669e32fedc2");

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private url = "https://developers.zomato.com/api/v2.1/";

  constructor(public http: HttpClient) { }


  //get request for geocode location
  public getGeoCode(latitude, longitude) {
    let myResponse = this.http.get(this.url + "geocode?lat=" + latitude + "&lon=" + longitude, { headers });
    return myResponse;
  }//end geocode location 

  
  //get request for restaurant detail
  public getRestoDetails(restautrant_id) {
    let myResponse = this.http.get(this.url + "restaurant?res_id=" + restautrant_id, { headers })
    return myResponse;
  }//end restaurant details


  //get request for search for locations
  public getLocation(queryName) {
    let myResponse = this.http.get(this.url + "locations?query=" + queryName, { headers })
    return myResponse;
  }//end search for locations


  //get request for search for restaurants 
  public getSearch = (entityid, entitytype, latitude, longitude, start, queryName?): any => {
    let myResponse = this.http.get(this.url + "search?entity_id=" + entityid + "&entity_type=" + entitytype + "&lat=" + latitude + "&lon=" + longitude + "&count=1000" + "&start=" + start + "&q=" + queryName, { headers })
    return myResponse;
  }//end search for restaurants


  //get request for restaurant reviews
  public getReviews = (restautrant_id) => {
    let myResponse = this.http.get(this.url + "reviews?res_id=" + restautrant_id + "&start=0&count=100", { headers })
    return myResponse;
  }//end restaurant reviews


}
