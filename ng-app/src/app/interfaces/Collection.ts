export interface Collection {
  _id?: string;
  name: string;
  owners: Array<string>;
  restaurants: Array<string>;
  originalOwwners: string;
};
