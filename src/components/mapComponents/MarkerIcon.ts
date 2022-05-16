import Leaflet from "leaflet";

const ramenMarkerIcon = Leaflet.icon({
  iconUrl: "/static/marker-icons/marker_red.png",
  iconSize: [22, 40],
  className: "ramen-marker-icon",
});

const udonMarkerIcon = Leaflet.icon({
  iconUrl: "/static/marker-icons/marker_blue.png",
  iconSize: [22, 40],
  className: "udon-marker-icon",
});

const curryMarkerIcon = Leaflet.icon({
  iconUrl: "/static/marker-icons/marker_turmeric.png",
  iconSize: [22, 40],
  className: "curry-marker-icon",
});

const yakinikuMarkerIcon = Leaflet.icon({
  iconUrl: "/static/marker-icons/marker_green.png",
  iconSize: [22, 40],
  className: "yakiniku-marker-icon",
});

export { ramenMarkerIcon, udonMarkerIcon, curryMarkerIcon, yakinikuMarkerIcon };
