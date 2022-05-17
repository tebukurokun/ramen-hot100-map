import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";

import { RecoilAtomKeys, RecoilSelectorKeys } from "./RecoilKeys";

interface MarkerDispState {
  ramen: boolean;
  udon: boolean;
  curry: boolean;
  yakiniku: boolean;
  japanese: boolean;
}

export const stateMarkerDisp = atom<MarkerDispState>({
  key: RecoilAtomKeys.MARKER_DISP_STATE,
  default: {
    ramen: true,
    udon: true,
    curry: true,
    yakiniku: false,
    japanese: false,
  },
});

// Actions定義
type MarkerDispActions = {
  useUpdateMarkerDisp: () => (markerDisp: MarkerDispState) => void;
};

export const markerDispActions: MarkerDispActions = {
  useUpdateMarkerDisp: () => {
    const setState = useSetRecoilState(stateMarkerDisp);

    return useCallback(
      (markerDisp: MarkerDispState) => setState(() => markerDisp),
      []
    );
  },
};

// selector定義
type MarkerDispSelectors = {
  useMarkerDisp: () => MarkerDispState;
};

const markerDispSelector = selector<MarkerDispState>({
  key: RecoilSelectorKeys.MARKER_DISP,
  get: ({ get }) => get(stateMarkerDisp),
});

export const markerDispSelectors: MarkerDispSelectors = {
  useMarkerDisp: () => useRecoilValue(markerDispSelector),
};
