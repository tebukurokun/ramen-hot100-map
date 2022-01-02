// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface Shop {
  id: string
  name: string
  url: string
  code: string
  imgPath:string
  address: string
  lng: number
  lat: number
}

export interface MapProps {
  items: {
    ramen: Shop[],
    udon: Shop[],
    curry: Shop[]
  },
}

export interface MapIndexProps {
  items: {
    ramen: Shop[],
    udon: Shop[],
  },
}
