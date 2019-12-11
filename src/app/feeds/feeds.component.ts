import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  public entity: any;
  public q: any;
  public allData = [];
  public lat: any;
  public long: any;
  public resData: any;
  public query: any = '';
  public searchValue: any = "";
  public start: number = 0;
  public totalResult: any;
  public loading: any;



  constructor(public foodService: FoodService, private _route: ActivatedRoute, private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    // getting location from cordinates geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.lat = data.coords.latitude;
        this.long = data.coords.longitude;
        this.resByLocation(this.lat, this.long)
      },
        error => {
          this.resByLocation(this.lat = 28.6304, this.long = 77.2177)
        })
    }
    else {
      this.toastr.error('Unable to fetch Location!!!')
      this.resByLocation(this.lat = 28.6304, this.long = 77.2177)
    }
  }


  //getting cordinates function
  public resByLocation: any = (lat: any, long: any) => {
    this.foodService.getGeoCode(lat, long).subscribe(
      data => {
        this.allData = data['nearby_restaurants']
      },
      error => {
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.error.code])
      })
  }//end cordinates request


  //getting location function  
  public searchLocation: any = (location: string) => {
    if (location != '' && location != 'null' && location != 'undefined') {
      this.foodService.getLocation(location).subscribe(
        dataResponse => {
          this.resData = dataResponse["location_suggestions"];
          (this.resData.length > 0) ? this.searchResto(this.query) : alert('Please enter correct location')
        },
        error => {
          this.toastr.error(error.error.message)
          this.router.navigate(['/error', error.error.code])
        })
    }
    else {
    }
  }// end location function


  // getting result of searched restaurant
  public searchResto: any = (query?: any) => {
    if (this.resData.length > 0) {
      this.toastr.success('Please wait...')
      setTimeout(() => {
        this.foodService.getSearch(this.resData[0].entity_id, this.resData[0].entity_type, this.resData[0].latitude, this.resData[0].longitude, this.start, query).subscribe(
          dataResponse => {
            this.totalResult = dataResponse.results_found
            this.allData = dataResponse.restaurants
          },
          (error: { error: { message: string; code: any; }; }) => {
            this.toastr.error(error.error.message)
            this.router.navigate(['/error', error.error.code])
          })
      }, 500)
    }
    else {
      this.toastr.error('Please enter correct location')
    }
  }//end of searched restaurant 


  // pagination starts here
  public nextPage: any = () => {
    if (this.start < 80 && this.totalResult > this.start) {
      this.start = this.start + 20;
      this.searchResto(this.query)
    }
    else if (this.start > 80) {
      this.toastr.warning('Maximum limit reached i.e. 100 restaurants viewed')
    }
    else {
      this.toastr.warning('Maximum limit reached i.e. 100 restaurants viewed')
    }
  }
  public previousPage: any = () => {
    if (this.start > 19) {
      this.start = this.start - 20;
      this.searchResto(this.query)
    }
  }// end pagination

}


