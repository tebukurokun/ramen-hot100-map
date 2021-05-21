// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface RamenShop {
  id: string
  name: string
  url: string
  address: string
  lng: number
  lat: number
}

export interface RamenMapProps {
  items: {
    tokyo: RamenShop[],
    east: RamenShop[],
    west: RamenShop[],
  }
}
