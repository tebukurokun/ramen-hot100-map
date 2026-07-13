import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useAtom, useSetAtom } from "jotai";
import { JSX, useEffect, useMemo, useState } from "react";
import {
  focusedShopAtom,
  markerVisibilityAtom,
  ShopMark,
  shopMarksAtom,
} from "../atoms";
import { CATEGORIES, CATEGORY_KEYS, Shop } from "../interfaces";
import { getShopMarkKey, loadCategoryShops } from "../utils/shops";

// リストシートのタブ定義。将来「周辺」タブ等を足すときはここに追加して
// タブごとの行データソースを分岐する
const LIST_TABS = [
  { key: "want", label: "⭐ 行きたい" },
  { key: "visited", label: "✅ 行った" },
] as const;

type ListTabKey = (typeof LIST_TABS)[number]["key"];

// マーク1件の表示用データ。shop が null のときは現在の百名店データに
// 引き当てられなかった（データ更新で百名店から外れた等）
type MarkRow = {
  markKey: string;
  mark: ShopMark;
  shop: Shop | null;
};

/**
 * 行きたい/行った店の一覧を表示するボトムシート。
 * 行タップで該当店へ地図移動、ゴミ箱でマーク解除。
 */
export const ShopListSheet = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}): JSX.Element => {
  const [marks, setMarks] = useAtom(shopMarksAtom);
  const setMarkerVisibility = useSetAtom(markerVisibilityAtom);
  const setFocusedShop = useSetAtom(focusedShopAtom);

  const [tab, setTab] = useState<ListTabKey>("want");
  // マークキー(tabelog URL) → 店 の索引。null は読み込み中
  const [shopsByKey, setShopsByKey] = useState<Map<string, Shop> | null>(null);

  // シートを開いたとき、マークが付いているカテゴリのデータだけ読み込んで索引を作る
  useEffect(() => {
    if (!isOpen) return;
    const categories = [
      ...new Set(Object.values(marks).map((mark) => mark.category)),
    ].filter((key) => key in CATEGORIES);
    let cancelled = false;
    Promise.all(categories.map(loadCategoryShops))
      .then((lists) => {
        if (cancelled) return;
        const index = new Map<string, Shop>();
        for (const shop of lists.flat()) {
          index.set(getShopMarkKey(shop), shop);
        }
        setShopsByKey(index);
      })
      .catch((err) => {
        console.error("Failed to load shops for mark list:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, marks]);

  // 表示中タブの行（カテゴリ順 → 店名順）
  const rows = useMemo<MarkRow[]>(() => {
    const entries: MarkRow[] = Object.entries(marks)
      .filter(([, mark]) => mark.status === tab)
      .map(([markKey, mark]) => ({
        markKey,
        mark,
        shop: shopsByKey?.get(markKey) ?? null,
      }));
    entries.sort((a, b) => {
      const byCategory =
        CATEGORY_KEYS.indexOf(a.mark.category) -
        CATEGORY_KEYS.indexOf(b.mark.category);
      if (byCategory !== 0) return byCategory;
      const nameA = a.shop?.name ?? a.mark.name ?? "";
      const nameB = b.shop?.name ?? b.mark.name ?? "";
      return nameA.localeCompare(nameB, "ja");
    });
    return entries;
  }, [marks, tab, shopsByKey]);

  const handleSelect = (shop: Shop) => {
    // 該当カテゴリの表示をONにしてから地図を店に移動する
    setMarkerVisibility((prev) => ({ ...prev, [shop.category]: true }));
    setFocusedShop({ shop, token: Date.now() });
    setIsOpen(false);
  };

  const handleRemove = (markKey: string) => {
    setMarks((prev) => {
      const next = { ...prev };
      delete next[markKey];
      return next;
    });
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      disableSwipeToOpen
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            maxHeight: "75vh",
          },
        },
      }}
    >
      {/* ドラッグハンドル */}
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}
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
          padding: "12px 16px 0",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
          マークした店
        </h2>
        <IconButton
          onClick={() => setIsOpen(false)}
          aria-label="閉じる"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </div>

      {/* タブ */}
      <Tabs
        value={tab}
        onChange={(_, value: ListTabKey) => setTab(value)}
        variant="fullWidth"
        sx={{ borderBottom: "1px solid #eee", minHeight: "40px" }}
      >
        {LIST_TABS.map(({ key, label }) => {
          const count = Object.values(marks).filter(
            (mark) => mark.status === key,
          ).length;
          return (
            <Tab
              key={key}
              value={key}
              label={`${label} (${count})`}
              sx={{ minHeight: "40px", fontSize: "0.85rem" }}
            />
          );
        })}
      </Tabs>

      {/* リスト */}
      <div style={{ overflowY: "auto", padding: "4px 8px 16px" }}>
        {/* データ読み込み中 */}
        {!shopsByKey && rows.length > 0 && (
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
        {/* 0件 */}
        {rows.length === 0 && (
          <div style={{ textAlign: "center", color: "#888", padding: "24px" }}>
            マークした店がありません。
            <br />
            店のポップアップから追加できます。
          </div>
        )}
        {shopsByKey &&
          rows.map(({ markKey, mark, shop }) => (
            <div
              key={markKey}
              style={{ display: "flex", alignItems: "center" }}
            >
              {shop ? (
                <ListItemButton
                  onClick={() => handleSelect(shop)}
                  sx={{ borderRadius: "8px", py: "6px", minWidth: 0 }}
                >
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
              ) : (
                // 現在の百名店データに引き当てられなかった店（グレー表示）
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "6px 16px",
                    opacity: 0.6,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {mark.name ?? "（店名不明）"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#999" }}>
                    現在の百名店データに見つかりません
                    {markKey.startsWith("http") && (
                      <>
                        {" ・ "}
                        <a
                          href={markKey}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1976D2" }}
                        >
                          食べログで開く
                          <OpenInNewIcon
                            sx={{ fontSize: "0.75rem", ml: "2px" }}
                          />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              )}
              <IconButton
                onClick={() => handleRemove(markKey)}
                size="small"
                aria-label="マークを解除する"
                sx={{ color: "#bbb", flexShrink: 0 }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
      </div>
    </SwipeableDrawer>
  );
};
