import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { keyframes, styled } from "@mui/material/styles";
import { useSetAtom } from "jotai";
import { JSX, useCallback, useEffect, useState } from "react";
import { currentLocationAtom, mapCenterAtom } from "../atoms";
import { parseMapHash } from "../utils/mapHash";
import { MapControlButton } from "./MapControlButton";

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
   * @param options.notifyOnError 取得失敗時に Snackbar で通知するか（初回自動取得では通知しない）
   * @param options.recenter 取得成功時に地図を現在地へ移動するか（共有リンクで開いた初回は動かさない）
   */
  const getCurrentLocation = useCallback(
    ({
      notifyOnError,
      recenter,
    }: {
      notifyOnError: boolean;
      recenter: boolean;
    }) => {
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

        if (recenter) {
          setMapCenter([latitude, longitude]);
        }
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
   * URLハッシュ（共有リンク）で位置が指定されている場合は、共有された表示位置を
   * 上書きしないよう現在地マーカーの表示だけ行い、地図は動かさない.
   */
  useEffect(() => {
    getCurrentLocation({
      notifyOnError: false,
      recenter: parseMapHash(window.location.hash) === null,
    });
  }, [getCurrentLocation]);

  return (
    <>
      <MapControlButton
        onClick={() =>
          getCurrentLocation({ notifyOnError: true, recenter: true })
        }
        disabled={isLoading}
        aria-label="現在位置に移動する"
      >
        <StyledIcon isLoading={isLoading} />
      </MapControlButton>
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
