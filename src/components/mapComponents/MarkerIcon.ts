import L from 'leaflet'

const ramenMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_red.png',
  iconSize: [22, 40],
  className: 'ramen-marker-icon',
} )

const udonMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_blue.png',
  iconSize: [22, 40],
  className: 'udon-marker-icon',
} )

export { ramenMarkerIcon, udonMarkerIcon }
