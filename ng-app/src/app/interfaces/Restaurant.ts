import { RestaurantSchedule } from './RestaurantSchedule';

export interface Restaurant {
  _id?: string;
  name: string;
  schedule: Array<RestaurantSchedule>;
};
