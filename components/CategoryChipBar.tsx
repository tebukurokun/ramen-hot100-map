import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { useAtom, useAtomValue } from "jotai";
import L from "leaflet";
import { JSX, useEffect, useMemo, useRef } from "react";
import { markerVisibilityAtom, pinnedCategoriesAtom } from "../atoms";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "../interfaces";

/**
 * 画面下端に常駐するカテゴリチップバー。
 * - ピン留めされているカテゴリ + ON 中のカテゴリのみ表示（横スクロール可能）
 * - 右端に「…」ボタンを固定配置、タップで全カテゴリのボトムシートを開く
 */
export const CategoryChipBar = ({
  onOpenSheet,
}: {
  onOpenSheet: () => void;
}): JSX.Element => {
  const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);
  const pinned = useAtomValue(pinnedCategoriesAtom);
  const stripRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

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

  // Leaflet が touch / wheel を横取りしてマップ操作になってしまうのを防ぎ、
  // チップバー単体で横スクロールできるようにする
  useEffect(() => {
    const strip = stripRef.current;
    const fab = fabRef.current;
    if (!strip || !fab) return;
    L.DomEvent.disableClickPropagation(strip);
    L.DomEvent.disableScrollPropagation(strip);
    L.DomEvent.disableClickPropagation(fab);

    // デスクトップ: 縦ホイールを横スクロールに変換（passive: false で preventDefault 可能に）
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }
    };
    strip.addEventListener("wheel", handleWheel, { passive: false });
    return () => strip.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      {/* スクロールするチップ列。右端の「…」ボタンと被らないよう right を空ける */}
      <div
        ref={stripRef}
        style={{
          position: "absolute",
          bottom: "15px",
          left: "10px",
          right: "58px",
          zIndex: 1000,
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "4px 0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
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
      </div>

      {/* 右端固定の「すべて開く」ボタン */}
      <IconButton
        ref={fabRef}
        onClick={onOpenSheet}
        aria-label="すべてのカテゴリを開く"
        sx={{
          position: "absolute",
          bottom: "19px",
          right: "10px",
          zIndex: 1001,
          width: "36px",
          height: "36px",
          padding: 0,
          backgroundColor: "rgba(255,255,255,0.95)",
          color: "#333",
          border: "1px solid #999",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,1)",
          },
        }}
      >
        <MoreHorizIcon />
      </IconButton>
    </>
  );
};
