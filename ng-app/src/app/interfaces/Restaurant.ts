import { RestaurantSchedule } from './RestaurantSchedule';

export interface Restaurant {
  name: string;
  schedule: Array<RestaurantSchedule>;
};
