import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public restoDetail: any;
  public restoData: any;
  public reviewData: any = [];
  public restoImage: any;

  constructor(public foodService: FoodService, private _route: ActivatedRoute, private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    // getting Restaurant id from the route
    this.restoDetail = this._route.snapshot.paramMap.get("restaurant")
    this.restaurantDetails(this.restoDetail)
    this.reviews(this.restoDetail)
  }


  //getting restaurant detail 
  public restaurantDetails = (restaurant) => {
    this.foodService.getRestoDetails(restaurant).subscribe(
      data => {
        this.restoData = data;
        this.restoImage = data['featured_image']
      },
      error => {
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.error.code])
      })
  }//end  restaurant detail 


  //getting restaurant reviews
  public reviews = (restaurant) => {
    this.foodService.getReviews(restaurant).subscribe(
      data => {
        this.reviewData = data['user_reviews'];
      },
      error => {
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.error.code])

      })
  }//end restaurant reviews

}
