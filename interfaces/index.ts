// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Shop {
  id: string;
  name: string;
  url: string;
  code: string;
  imgPath: string;
  address: string;
  lng: number;
  lat: number;
}

export interface ShopData {
  category: string;
  categoryJp: string;
  shops: Shop[];
}

export interface MapIndexProps {
  items: {
    ramen: Shop[];
    udon: Shop[];
    curry: Shop[];
    yakiniku: Shop[];
  };
}

export interface MapProps {
  items: ShopData[];
}

export type MarkerVisibility = {
  ramen: boolean;
  udon: boolean;
};
