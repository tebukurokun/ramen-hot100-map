import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// 地図上に浮かせるコントロールボタンの共通スタイル
// （現在地ボタン・店名検索ボタン・リストボタンで共用）
export const MapControlButton = styled(IconButton)({
  backgroundColor: "#E0E0E0",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#D6D6D6",
    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.3)",
  },
  padding: "5px",
  borderRadius: "10px",
});
