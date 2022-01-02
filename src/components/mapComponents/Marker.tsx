// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import LocationOnIcon from '@material-ui/icons/LocationOn'
import {
  Marker, Popup,
} from 'react-leaflet'
import L from 'leaflet'

import { RamenShop } from '../../interfaces'

const MarkerComponent = (
  { item, icon, category } :
  {
  item: RamenShop,
  icon: L.Icon
  category: string
},
): JSX.Element => {
  return (
    <Marker
      position={[item.lat, item.lng]}
      key={item.id}
      icon={icon}
    >
      <Popup>
        <p style={{ maxWidth: '100px', fontWeight: 'bolder' }}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        </p>
        <p>
          {`${category}`}
        </p>
        <p style={{ maxWidth: '100px', fontSize: 'smaller' }}>
          <LocationOnIcon fontSize="small" />
          <a href={`http://maps.google.co.jp/maps?q=${item.address}`} target="_blank" rel="noreferrer">
            {item.address}
          </a>
        </p>

      </Popup>
    </Marker>

  )
}

export default MarkerComponent
