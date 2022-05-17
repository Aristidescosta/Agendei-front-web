export type Establishment = {
  _id: string;
  address: string;
  img: string;
  name: string;
  nif: string;
  phones_number: Array<string>;
  description: string;
  category: {
    _id: string;
    name: string;
  }
  createdAt: Date;
  updatedAt: Date;
  services: Array<object>;
  ratingmedia: string;
}