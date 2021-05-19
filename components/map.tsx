// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Map as MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/router'
import L from 'leaflet'

import { RamenShop } from '../interfaces'

type Props = {
  items: RamenShop[]
}

const parseParamInt = ( p: string | string[] ): number => {
  return parseInt( Array.isArray( p ) ? p[0] : p, 10 )
}

const parseParamFloat = ( p: string | string[] ): number => {
  return parseFloat( Array.isArray( p ) ? p[0] : p )
}

const LAT = 35.677204
const LNG = 139.747853
const ZOOM = 12

const myMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icon.png',
  iconSize: [25, 41],
} )

const Map = ( { items }: Props ): JSX.Element => {
  const router = useRouter()
  const { lng, lat, zoom } = router.query

  return (
    <div>
      <MapContainer
        center={[parseParamFloat( lat ) || LAT, parseParamFloat( lng ) || LNG]}
        zoom={parseParamInt( zoom ) || ZOOM}
        scrollWheelZoom
        style={{ height: '80vh', width: '100%' }}
        ondragend={( event ) => {
          const z = event.target.getZoom()
          const c = event.target.getCenter()
          router.push( `?lng=${c.lng}&lat=${c.lat}&zoom=${z}` )
        }}
        onzoomend={( event ) => {
          const z = event.target.getZoom()
          const c = event.target.getCenter()
          router.push( `?lng=${c.lng}&lat=${c.lat}&zoom=${z}` )
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        { items.map( ( item ) => (

          <Marker
            position={[item.lat, item.lng]}
            key={item.id}
            icon={myMarkerIcon}
          >
            <Popup>
              <p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </p>
              <p>
                {item.address}
              </p>

            </Popup>
          </Marker>
        ) ) }
      </MapContainer>
      {/* <button
        type="button"
        onClick={() => {
          router.push( '' )
        }}
      >
        Reset
      </button> */}
    </div>
  )
}

export default Map
