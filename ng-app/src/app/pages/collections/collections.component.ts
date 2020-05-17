import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantSchedule, Collection, Restaurant } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  collectionError: string;
  collections: Array<Collection>;
  collection: Collection;
  updateCollection: Collection;
  modalUpdateCollectionRef: BsModalRef;
  modalDeleteCollectionRef: BsModalRef;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private collectionService: CollectionsService,
    private modal: BsModalService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('id')) {
      this.router.navigateByUrl('/register');
    } else {
      this.usersService.collections()
        .subscribe((collections:any) => {
          this.collections = collections.data;
        });
    }
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
      };
      return previous;
    }, []);
  }

  getCurrentUserId() {
    return localStorage.getItem('id');
  }

  editCollection(collection: Collection, template: TemplateRef<any>) {
    this.updateCollection = {
      ...collection
    };
    this.modalUpdateCollectionRef = this.modal.show(template, {class: 'modal-sm'});
  }

  deleteCollection(collection: Collection, template: TemplateRef<any>) {
    this.collection = collection;
    this.modalDeleteCollectionRef = this.modal.show(template, {class: 'modal-sm'});
  }

  onCollectionSubmit(form: NgForm) {
    if (form.valid) {
      this.collectionError = undefined;
      this.collectionService.update(this.updateCollection._id, this.updateCollection.name)
        .subscribe(collection => {
          this.modalUpdateCollectionRef.hide();
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
    this.modalUpdateCollectionRef.hide();
  }

  onDelete() {
    this.collectionError = undefined;
    this.collectionService.delete(this.collection._id)
      .subscribe(collection => {
        this.modalDeleteCollectionRef.hide();
        this.usersService.collections()
          .subscribe((collections:any) => {
            this.collections = collections.data;
          });
      }, error => {
        this.collectionError = 'Failed to create collection';
      });
  }

  onCancelDelete() {
    this.modalDeleteCollectionRef.hide();
  }

  deleteRestaurant(collection: Collection, restaurant: Restaurant) {
    this.collectionService.remove(collection._id, restaurant._id)
      .subscribe(collection => {
        this.usersService.collections()
          .subscribe((collections:any) => {
            this.collections = collections.data;
          });
      });
  }
}
