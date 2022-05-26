interface imageType {
  id: number;
  img: string;
}

export type Establishment = {
  _id: string;
  address: string;
  open: boolean;
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
  images: Array<imageType>;
  ratingmedia: string;
}