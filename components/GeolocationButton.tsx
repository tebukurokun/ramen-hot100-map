import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
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

const getErrorMessage = (err: GeolocationPositionError): string => {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return "位置情報の利用が許可されていません。ブラウザの設定を確認してください。";
    case err.TIMEOUT:
      return "現在地の取得がタイムアウトしました。再度お試しください。";
    default:
      return "現在地を取得できませんでした。";
  }
};

export const GeolocationButton = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setMapCenter = useSetAtom(mapCenterAtom);
  const setCurrentLocation = useSetAtom(currentLocationAtom);

  /**
   * 現在地を取得.
   *
   * @param notifyOnError 取得失敗時に Snackbar で通知するか（初回自動取得では通知しない）
   */
  const getCurrentLocation = useCallback(
    (notifyOnError: boolean) => {
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
        const { latitude, longitude, accuracy } = position.coords;

        setMapCenter([latitude, longitude]);
        setCurrentLocation({ position: [latitude, longitude], accuracy });
        setIsLoading(false);
      };

      /**
       * 現在地取得失敗時
       */
      const error = (err: GeolocationPositionError) => {
        console.warn(`ERROR (${err.code}): ${err.message}`);
        if (notifyOnError) {
          setErrorMessage(getErrorMessage(err));
        }
        setIsLoading(false);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    [setMapCenter, setCurrentLocation],
  );

  /**
   * コンポーネントの初期レンダリング時に現在地を取得.
   */
  useEffect(() => {
    getCurrentLocation(false);
  }, [getCurrentLocation]);

  return (
    <>
      <StyledButton
        onClick={() => getCurrentLocation(true)}
        disabled={isLoading}
        aria-label="現在位置に移動する"
      >
        <StyledIcon isLoading={isLoading} />
      </StyledButton>
      {/* 位置情報取得失敗時の通知 */}
      <Snackbar
        open={errorMessage !== null}
        autoHideDuration={5000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
