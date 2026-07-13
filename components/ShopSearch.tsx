import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import { useSetAtom } from "jotai";
import { JSX, useEffect, useMemo, useState } from "react";
import { focusedShopAtom, markerVisibilityAtom } from "../atoms";
import { CATEGORIES, Shop } from "../interfaces";
import { loadAllShops, normalizeForSearch } from "../utils/shops";
import { MapControlButton } from "./MapControlButton";

// 検索結果の最大表示件数
const MAX_RESULTS = 30;

// 店名の正規化キーを事前計算した検索インデックス
type SearchEntry = {
  shop: Shop;
  nameKey: string;
};

/**
 * 全カテゴリ横断の店名検索。
 * 虫めがねボタン → ダイアログで検索 → 選択で該当カテゴリをONにして地図移動。
 */
export const ShopSearch = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[] | null>(null);

  const setMarkerVisibility = useSetAtom(markerVisibilityAtom);
  const setFocusedShop = useSetAtom(focusedShopAtom);

  // 初回オープン時に全カテゴリのデータを読み込んで検索インデックスを作る
  useEffect(() => {
    if (!isOpen || index) return;
    let cancelled = false;
    loadAllShops()
      .then((shops) => {
        if (cancelled) return;
        setIndex(
          shops.map((shop) => ({
            shop,
            nameKey: normalizeForSearch(shop.name),
          })),
        );
      })
      .catch((err) => {
        console.error("Failed to load shops for search:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, index]);

  const results = useMemo<Shop[]>(() => {
    if (!index) return [];
    const q = normalizeForSearch(query);
    if (!q) return [];
    // 前方一致を優先して並べる
    const startsWith: Shop[] = [];
    const includes: Shop[] = [];
    for (const { shop, nameKey } of index) {
      if (!nameKey.includes(q)) continue;
      (nameKey.startsWith(q) ? startsWith : includes).push(shop);
      if (startsWith.length >= MAX_RESULTS) break;
    }
    return [...startsWith, ...includes].slice(0, MAX_RESULTS);
  }, [index, query]);

  const handleSelect = (shop: Shop) => {
    // 該当カテゴリの表示をONにしてから地図を店に移動する
    setMarkerVisibility((prev) => ({ ...prev, [shop.category]: true }));
    setFocusedShop({ shop, token: Date.now() });
    setIsOpen(false);
  };

  return (
    <>
      <MapControlButton
        onClick={() => setIsOpen(true)}
        aria-label="店名で検索する"
      >
        <SearchIcon sx={{ fontSize: "2rem", color: "#555" }} />
      </MapControlButton>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        slotProps={{
          paper: {
            sx: {
              position: "fixed",
              top: 0,
              m: "12px",
              width: "calc(100% - 24px)",
              maxHeight: "70vh",
              borderRadius: "12px",
            },
          },
        }}
      >
        <div style={{ padding: "12px 12px 4px" }}>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder="店名で検索（全カテゴリ対象）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        {/* データ読み込み中 */}
        {!index && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <CircularProgress size={28} />
          </div>
        )}
        {/* 検索結果 */}
        {index && (
          <List sx={{ overflowY: "auto", pt: 0, pb: 1 }}>
            {query.trim() !== "" && results.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#888",
                  padding: "24px 0",
                }}
              >
                該当する店がありません
              </div>
            )}
            {results.map((shop) => (
              <ListItemButton key={shop.id} onClick={() => handleSelect(shop)}>
                <span style={{ fontSize: "1.4rem", marginRight: "10px" }}>
                  {CATEGORIES[shop.category].emoji}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shop.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#888",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {CATEGORIES[shop.category].shortLabel} ・ {shop.address}
                  </div>
                </div>
              </ListItemButton>
            ))}
          </List>
        )}
      </Dialog>
    </>
  );
};
