// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type Shop = {
  name: string;
  url: string;
  address: string;
  code: string;
  lat: string;
  lng: string;
  id: string;
};

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

export enum ShopCategory {
  ramen = "ラーメン百名店",
  udon = "うどん百名店",
}

export type MarkerVisibility = {
  [key in keyof typeof ShopCategory]: boolean;
};

export interface MarkerItem {
  category: keyof typeof ShopCategory;
  position: [number, number];
  icon: string;
  popUp: React.ReactNode;
}
