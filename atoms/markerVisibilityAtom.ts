import { atom } from "jotai";
import { MarkerVisibility } from "../interfaces";

export const markerVisibilityAtom = atom<MarkerVisibility>({
	ramen: true,
	udon: false,
	curry: false,
});
