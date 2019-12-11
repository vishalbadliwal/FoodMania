import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public citiesData: any;
  constructor(public foodService: FoodService, public router: Router) { }

  ngOnInit() {

  }
  public searchCity = (name: any) => {
    this.router.navigate(['/feeds', name])
  }

  public showNearBy = () => {
    this.router.navigate(['/feeds'])
  }

}


