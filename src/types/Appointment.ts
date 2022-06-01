export type Appointment = {
  _id: string;
  client: {
    name: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
    preco: string;
  };
  date: Date;
};
