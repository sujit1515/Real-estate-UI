export interface Room {
  _id?: string;

  title: string;

  type: "1BHK" | "2BHK" | "3BHK";

  price: number;

  location: string;

  description?: string;

  isAvailable?: boolean;

  createdAt?: string;
  updatedAt?: string;
}