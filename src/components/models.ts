export interface IUser {
  picture: {
    large: string;
  };
  cell: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    age: number;
  };
  id: {
    name: string;
    value: string;
  };
  fulladdress: string;
  location: {
    street: {
      name: string;
      number: number;
    };
    city: string;
    state: string;
    postcode: number;
  };
  phone: string;
  email: string;
}
