// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Marker, Popup,
} from 'react-leaflet'
import L from 'leaflet'

import { RamenShop } from '../../interfaces'

type Props = {
  item: RamenShop,
  icon: L.Icon
}

const MarkerComponent = ( { item, icon } : Props ): JSX.Element => {
  return (
    <Marker
      position={[item.lat, item.lng]}
      key={item.id}
      icon={icon}
    >
      <Popup>
        <p>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        </p>

        <div>
          <img
            src={`/static/ramen-images/${item.code}.jpg`}
            alt={`${item.name}`}
            style={{
              width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%', minHeight: '100px',
            }}
          />
        </div>

        <p style={{ maxWidth: '200px' }}>
          {item.address}
        </p>

      </Popup>
    </Marker>
  )
}

export default MarkerComponent
