import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import { useAtom, useAtomValue } from "jotai";
import { JSX, useMemo } from "react";
import { markerVisibilityAtom, pinnedCategoriesAtom } from "../atoms";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "../interfaces";

/**
 * 画面下端に常駐するカテゴリチップバー。
 * - ピン留めされているカテゴリ + ON 中のカテゴリのみ表示
 * - チップタップで visibility をトグル
 * - 末尾の「もっと見る」で全カテゴリのボトムシートを開く
 */
export const CategoryChipBar = ({
  onOpenSheet,
}: {
  onOpenSheet: () => void;
}): JSX.Element => {
  const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);
  const pinned = useAtomValue(pinnedCategoriesAtom);

  // 表示するチップ: ピン留め or ON のカテゴリ。順序は CATEGORIES の宣言順。
  const visibleChipKeys = useMemo<CategoryKey[]>(
    () => CATEGORY_KEYS.filter((key) => pinned[key] || markerVisibility[key]),
    [pinned, markerVisibility],
  );

  const handleToggle = (key: CategoryKey) => () => {
    setMarkerVisibility({
      ...markerVisibility,
      [key]: !markerVisibility[key],
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "15px",
        left: "10px",
        right: "10px",
        zIndex: 1000,
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        overflowY: "hidden",
        padding: "4px 0",
        // スクロールバーを非表示
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      // WebKit のスクロールバー非表示
      className="hide-scrollbar"
    >
      {visibleChipKeys.map((key) => {
        const { emoji, shortLabel, switchColor } = CATEGORIES[key];
        const isOn = markerVisibility[key];
        return (
          <Chip
            key={key}
            label={`${emoji} ${shortLabel}`}
            onClick={handleToggle(key)}
            sx={{
              flexShrink: 0,
              fontSize: "0.9rem",
              fontWeight: 600,
              height: "36px",
              backgroundColor: isOn ? switchColor : "rgba(255,255,255,0.95)",
              color: isOn ? "#fff" : "#666",
              border: isOn ? "none" : "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: isOn ? switchColor : "rgba(255,255,255,1)",
                opacity: isOn ? 0.9 : 1,
              },
            }}
          />
        );
      })}
      <Chip
        icon={<MoreHorizIcon />}
        label="すべて"
        onClick={onOpenSheet}
        sx={{
          flexShrink: 0,
          fontSize: "0.9rem",
          fontWeight: 600,
          height: "36px",
          backgroundColor: "rgba(255,255,255,0.95)",
          color: "#333",
          border: "1px solid #999",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,1)",
          },
        }}
        aria-label="すべてのカテゴリを開く"
      />
    </div>
  );
};
