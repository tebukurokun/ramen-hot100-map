import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import { RecoilAtomKeys, RecoilSelectorKeys } from "./RecoilKeys";

interface MapSetting {
  lat: number;
  lng: number;
  zoom: number;
}

const mapSettingState = atom<MapSetting>({
  key: RecoilAtomKeys.MAP_SETTING_STATE,
  default: { lat: 36.8, lng: 138.1, zoom: 6 },
});

// Actions定義
type MapSettingActions = {
  useUpdateMapSetting: () => (mapSetting: MapSetting) => void;
};

export const mapSettingActions: MapSettingActions = {
  useUpdateMapSetting: () => {
    const setState = useSetRecoilState(mapSettingState);

    return useCallback(
      (mapSetting: MapSetting) => setState(() => mapSetting),
      []
    );
  },
};

// selectors定義
type MapSettingSelectors = {
  useMapSetting: () => MapSetting;
};

const mapSettingSelector = selector<MapSetting>({
  key: RecoilSelectorKeys.MAP_SETTING,
  get: ({ get }) => get(mapSettingState),
});

export const mapSettingSelectors: MapSettingSelectors = {
  useMapSetting: () => useRecoilValue(mapSettingSelector),
};
