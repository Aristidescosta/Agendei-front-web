export type Establishment = {
  address: string;
  img: string;
  name: string;
  nif: string;
  phones_number: Array<string>;
  description: string;
  categoryId: {
    _id: string;
    name: string;
  }
}