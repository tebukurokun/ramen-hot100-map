import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import IconButton from "@mui/material/IconButton";
import { keyframes, styled } from "@mui/material/styles";
import { useSetAtom } from "jotai";
import { JSX, useCallback, useEffect, useState } from "react";
import { currentLocationAtom, mapCenterAtom } from "../atoms";

// アニメーションスタイル
const blinkAnimation = keyframes`
  0% { color: #E0E0E0; }
  100% { color: #E0E0E0; }
`;

// アイコンスタイル
const StyledIcon = styled(MyLocationOutlinedIcon, {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  fontSize: "2rem",
  color: "#1a1aff",
  animation: isLoading ? `${blinkAnimation} 0.4s infinite alternate` : "none",
}));

// ボタンスタイル
const StyledButton = styled(IconButton)({
  backgroundColor: "#E0E0E0", // ボタンの背景を灰色に設定
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // ボタンに影を設定
  "&:hover": {
    backgroundColor: "#D6D6D6", // ホバー時の背景色
    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.3)", // ホバー時に影を強調
  },
  padding: "5px",
  borderRadius: "10px", // 角丸
});

export const GeolocationButton = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const setMapCenter = useSetAtom(mapCenterAtom);
  const setCurrentLocation = useSetAtom(currentLocationAtom);

  /**
   * 現在地を取得.
   */
  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);

    /**
     * option
     */
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    /**
     * 現在地取得成功時
     */
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      setMapCenter([latitude, longitude]);
      setCurrentLocation([latitude, longitude]);
      setIsLoading(false);

      console.info(position);
    };

    /**
     * 現在地取得失敗時
     */
    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR (${err.code}): ${err.message}`);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [setMapCenter, setCurrentLocation]);

  /**
   * コンポーネントの初期レンダリング時に現在地を取得.
   */
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <StyledButton
      onClick={getCurrentLocation}
      disabled={isLoading}
      aria-label="現在位置に移動する"
    >
      <StyledIcon isLoading={isLoading} />
    </StyledButton>
  );
};
