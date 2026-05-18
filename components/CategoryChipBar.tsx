import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { useAtom, useAtomValue } from "jotai";
import L from "leaflet";
import {
  JSX,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { markerVisibilityAtom, pinnedCategoriesAtom } from "../atoms";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "../interfaces";

// チップ列右端の「すべて」ボタンの幅 (ラベル付き / アイコンのみ) ぶんだけ
// チップ列の right を空ける。差分はヒステリシス判定にも使う。
const COLLAPSED_RIGHT = 58;
const EXPANDED_RIGHT = 110;

/**
 * 画面下端に常駐するカテゴリチップバー。
 * - ピン留めされているカテゴリ + ON 中のカテゴリのみ表示（横スクロール可能）
 * - 右端に「☰ すべて」ボタンを固定配置、タップで全カテゴリのボトムシートを開く
 *   チップが多くて幅が足りないときは「…」アイコンのみに縮退する
 */
export const CategoryChipBar = ({
  onOpenSheet,
}: {
  onOpenSheet: () => void;
}): JSX.Element => {
  const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);
  const pinned = useAtomValue(pinnedCategoriesAtom);
  const stripRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    if (!strip) return;
    L.DomEvent.disableClickPropagation(strip);
    L.DomEvent.disableScrollPropagation(strip);

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

  // ボタン(Chip/IconButton)が切り替わっても Leaflet にイベントを奪われないように、
  // マウント時に毎回 disableClickPropagation を再適用する。
  const fabRefCallback = useCallback((node: HTMLElement | null) => {
    if (node) L.DomEvent.disableClickPropagation(node);
  }, []);

  // チップ列の収まり具合を監視して、ラベル付き / アイコンのみを切り替える。
  // scrollWidth は overflow が無いと clientWidth に丸められて slack が分からなくなる
  // ため、子要素の offsetWidth を直接合計してチップの実コンテンツ幅を測り、
  // 「展開モードのときに使える幅」と比較する。
  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const parent = strip.parentElement;
    if (!parent) return;

    const GAP_PX = 8;
    const STRIP_LEFT = 10;

    const check = () => {
      const children = strip.children;
      let contentWidth = 0;
      for (let i = 0; i < children.length; i++) {
        contentWidth += (children[i] as HTMLElement).offsetWidth;
      }
      if (children.length > 1) {
        contentWidth += (children.length - 1) * GAP_PX;
      }
      const availableExpanded =
        parent.clientWidth - STRIP_LEFT - EXPANDED_RIGHT;
      setIsCollapsed(contentWidth > availableExpanded);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [visibleChipKeys]);

  return (
    <>
      {/* スクロールするチップ列。右端の「すべて」ボタンと被らないよう right を空ける */}
      <div
        ref={stripRef}
        style={{
          position: "absolute",
          bottom: "15px",
          left: "10px",
          right: `${isCollapsed ? COLLAPSED_RIGHT : EXPANDED_RIGHT}px`,
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

      {/* 右端固定の「すべて開く」ボタン。チップが多くて幅が足りないときは
          「…」アイコンだけに縮退する */}
      {isCollapsed ? (
        <IconButton
          ref={fabRefCallback}
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
      ) : (
        <Chip
          ref={fabRefCallback}
          icon={<MenuIcon sx={{ fontSize: "1.1rem" }} />}
          label="すべて"
          onClick={onOpenSheet}
          aria-label="すべてのカテゴリを開く"
          sx={{
            position: "absolute",
            bottom: "15px",
            right: "10px",
            zIndex: 1001,
            height: "36px",
            fontSize: "0.9rem",
            fontWeight: 600,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "#333",
            border: "1px solid #999",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            "& .MuiChip-icon": {
              color: "#333",
              marginLeft: "8px",
              marginRight: "-4px",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        />
      )}
    </>
  );
};
