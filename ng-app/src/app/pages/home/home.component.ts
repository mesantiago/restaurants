import { Component, OnInit } from '@angular/core';
import { RestaurantSearch, Restaurant, RestaurantSchedule } from 'src/app/interfaces';
import { NgForm } from '@angular/forms';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  error: any;
  fetching: boolean;
  pagination: {
    page: Number,
    limit: Number,
    total: Number,
    totalPages: Number
  } = {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0
  };
  restaurants: Array<Restaurant>;
  search: RestaurantSearch = {
    name: undefined,
    date: new Date(),
    time: new Date()
  }

  constructor(
    private restaurant: RestaurantsService
  ) { }

  ngOnInit(): void {
    this.searchRestaurant(undefined, new Date().getDay(), this.getTime(new Date()));
  }

  getTime(time) {
    const newDate = new Date(0);
    newDate.setUTCHours(time ? time.getHours() : 0);
    newDate.setUTCMinutes(time ? time.getMinutes() : 0);
    return newDate.getTime();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { date, time, name } = this.search;
      this.pagination.page = 1;
      this.searchRestaurant(
        name,
        date ? date.getDay() : undefined,
        time ? this.getTime(time) : undefined
      )
    }
  }

  searchRestaurant(name, day, time) {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    this.restaurant
        .search(name, day, time, this.pagination.page, this.pagination.limit)
        .subscribe((response: any) => {
          this.fetching = false;
          const {
            data, limit, page, total, totalPages
          } = response;
          this.restaurants = data;
          this.pagination = {
            limit,
            page,
            total,
            totalPages
          };
        }, (error) => {
          this.fetching = false;
          this.error = error;
        });
  }

  clearSearch(form: NgForm) {
    this.search = {
      name: undefined,
      date: undefined,
      time: undefined
    };
    this.onSubmit(form);
  }

  groupSchedule(schedules: Array<RestaurantSchedule>) {
    return schedules.reduce((previous, { day,  startTime, endTime }) => {
      const match = previous.filter((value:RestaurantSchedule) => {
        return value.startTime === startTime && value.endTime == endTime;
      })[0]
      if (match) {
        match.days.push(day);
      } else {
        previous.push({
          startTime,
          endTime,
          days: [day]
        });
      }
      return previous;
    }, []);
  }

  pageChanged(event: any): void {
    console.log(event.page);
    this.pagination.page = event.page;
    const { date, time, name } = this.search;
    this.searchRestaurant(
      name,
      date ? date.getDay() : undefined,
      time ? this.getTime(time) : undefined
    );
  }

  isTimeMatch(startTime, endTime) {
    if (!this.search.time) {
      return false;
    }
    const time = this.getTime(this.search.time);
    if (startTime < endTime) {
      return time >= startTime && time <= endTime;
    } else {
      return time >= startTime || time <= endTime;
    }
  }
}
