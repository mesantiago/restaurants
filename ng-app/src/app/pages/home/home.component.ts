import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestaurantSearch, Restaurant, RestaurantSchedule, Collection } from 'src/app/interfaces';
import { NgForm } from '@angular/forms';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalCollectionRef: BsModalRef;
  modalNewCollectionRef: BsModalRef;
  error: any;
  collectionError: string;
  addRestaurantError: string;
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
  selectedRestaurant: string;
  collections: Array<Collection>;
  newCollection: Collection;
  search: RestaurantSearch = {
    name: undefined,
    date: new Date(),
    time: new Date()
  }

  constructor(
    private restaurantsService: RestaurantsService,
    private usersService: UsersService,
    private collectionService: CollectionsService,
    private modal: BsModalService,
    private router: Router
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
    this.restaurantsService
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

  addToCollection(id: string, template: TemplateRef<any>) {
    if (localStorage.getItem('id')) {
      this.selectedRestaurant = id;
      this.usersService.collections()
        .subscribe((collections:any) => {
          this.collections = collections.data;
          this.modalCollectionRef = this.modal.show(template, {class: 'modal-sm'});
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  createCollection(template: TemplateRef<any>) {
    this.newCollection = {
      name: undefined,
      owners: undefined,
      originalOwwners: undefined,
      restaurants: undefined
    }
    this.modalNewCollectionRef = this.modal.show(template, {class: 'modal-sm'});
  }

  onCollectionSubmit(form: NgForm) {
    if (form.valid) {
      this.collectionError = undefined;
      this.collectionService.create(this.newCollection.name)
        .subscribe(collection => {
          this.modalNewCollectionRef.hide();
          this.usersService.collections()
            .subscribe((collections:any) => {
              this.collections = collections.data;
            });
        }, error => {
          this.collectionError = 'Failed to create collection';
        });
    }
  }

  onCreateCollectionCancel() {
    this.modalNewCollectionRef.hide();
  }

  selectCollection(collectionId: string) {
    this.addRestaurantError = undefined;
    this.collectionService.add(collectionId, this.selectedRestaurant)
      .subscribe((collections:any) => {
        this.modalCollectionRef.hide();
      }, response => {
        this.addRestaurantError = response.error && response.error.indexOf('Already in the collection') >=0 ? 'Already in the collection' : 'Failed to add to collection';
      });
  }
}
