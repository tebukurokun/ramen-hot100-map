import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { JSX, useMemo, useState } from "react";
import { markerVisibilityAtom, pinnedCategoriesAtom } from "../atoms";
import {
  CATEGORIES,
  CATEGORY_KEYS,
  CategoryKey,
  MarkerVisibility,
  SECTION_KEYS,
  SECTIONS,
  SectionKey,
} from "../interfaces";

/**
 * 全カテゴリを section 別に表示するボトムシート。
 * - 検索ボックスで絞り込み
 * - 各行に visibility トグル + ピン留め★
 */
export const CategorySheet = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}): JSX.Element => {
  const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);
  const [pinned, setPinned] = useAtom(pinnedCategoriesAtom);
  const [query, setQuery] = useState("");

  const handleToggleVisibility = (key: CategoryKey) => () => {
    setMarkerVisibility({
      ...markerVisibility,
      [key]: !markerVisibility[key],
    });
  };

  const handleTogglePin = (key: CategoryKey) => () => {
    setPinned({ ...pinned, [key]: !pinned[key] });
  };

  // 全カテゴリの visibility を OFF に
  const handleClearAll = () => {
    setMarkerVisibility(
      Object.fromEntries(
        CATEGORY_KEYS.map((k) => [k, false]),
      ) as MarkerVisibility,
    );
  };

  // 全カテゴリの visibility を ON に
  const handleSelectAll = () => {
    setMarkerVisibility(
      Object.fromEntries(
        CATEGORY_KEYS.map((k) => [k, true]),
      ) as MarkerVisibility,
    );
  };

  // ピン留めはそのまま。ピン留めされているカテゴリのみ表示ONにする
  const handleResetToDefaults = () => {
    setMarkerVisibility(
      Object.fromEntries(
        CATEGORY_KEYS.map((k) => [k, pinned[k]]),
      ) as MarkerVisibility,
    );
  };

  // 検索クエリでフィルタしたうえで section ごとにグルーピング
  const sectionedKeys = useMemo<Record<SectionKey, CategoryKey[]>>(() => {
    const q = query.trim().toLowerCase();
    const matches = (key: CategoryKey): boolean => {
      if (!q) return true;
      const { label, shortLabel } = CATEGORIES[key];
      return (
        label.toLowerCase().includes(q) || shortLabel.toLowerCase().includes(q)
      );
    };

    const grouped = Object.fromEntries(
      SECTION_KEYS.map((s) => [s, [] as CategoryKey[]]),
    ) as Record<SectionKey, CategoryKey[]>;

    for (const key of CATEGORY_KEYS) {
      if (!matches(key)) continue;
      grouped[CATEGORIES[key].section].push(key);
    }
    return grouped;
  }, [query]);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      disableSwipeToOpen
      PaperProps={{
        sx: {
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          maxHeight: "75vh",
        },
      }}
    >
      {/* ドラッグハンドル */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "8px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#ccc",
          }}
        />
      </div>

      {/* ヘッダー */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px 8px",
          gap: "4px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
          カテゴリ
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button
            onClick={handleClearAll}
            size="small"
            sx={{ minWidth: 0, color: "#666", fontSize: "0.8rem" }}
          >
            クリア
          </Button>
          <Button
            onClick={handleResetToDefaults}
            size="small"
            sx={{ minWidth: 0, color: "#666", fontSize: "0.8rem" }}
          >
            ★のみON
          </Button>
          <Button
            onClick={handleSelectAll}
            size="small"
            sx={{ minWidth: 0, color: "#666", fontSize: "0.8rem" }}
          >
            全てON
          </Button>
          <IconButton
            onClick={() => setIsOpen(false)}
            aria-label="閉じる"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      {/* 検索ボックス */}
      <div style={{ padding: "0 16px 8px" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="カテゴリを検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* セクション一覧 */}
      <div
        style={{
          overflowY: "auto",
          padding: "0 16px 16px",
        }}
      >
        {SECTION_KEYS.map((section) => {
          const keys = sectionedKeys[section];
          if (keys.length === 0) return null;
          return (
            <div key={section} style={{ marginTop: "12px" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#888",
                  padding: "4px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {SECTIONS[section].label}
              </div>
              {keys.map((key) => {
                const { emoji, label, switchColor } = CATEGORIES[key];
                const isOn = markerVisibility[key];
                const isPinned = pinned[key];
                return (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "6px 0",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem", marginRight: "10px" }}>
                      {emoji}
                    </span>
                    <span style={{ flex: 1, fontSize: "0.95rem" }}>
                      {label}
                    </span>
                    <IconButton
                      onClick={handleTogglePin(key)}
                      size="small"
                      aria-label={isPinned ? "ピン留めを外す" : "ピン留めする"}
                    >
                      {isPinned ? (
                        <StarIcon sx={{ color: "#F5B400" }} />
                      ) : (
                        <StarBorderIcon sx={{ color: "#bbb" }} />
                      )}
                    </IconButton>
                    <Switch
                      checked={isOn}
                      onChange={handleToggleVisibility(key)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: switchColor,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: switchColor,
                          },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* 検索結果0件 */}
        {SECTION_KEYS.every((s) => sectionedKeys[s].length === 0) && (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              padding: "24px 0",
            }}
          >
            該当するカテゴリがありません
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
};
