// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from 'next/image'
import LocationOnIcon from '@material-ui/icons/LocationOn'
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
        <p style={{ maxWidth: '100px', fontWeight: 'bolder' }}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        </p>

        {item.imgPath ? (
          <div>
            <a href={item.url} target="_blank" rel="noreferrer">
              <Image
                src={`${item.imgPath}`}
                alt={`${item.name}`}
                style={{
                  maxHeight: '100%', maxWidth: '100%',
                }}
                width={150}
                height={150}
              />
            </a>
          </div>
        )
          : ''}

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
