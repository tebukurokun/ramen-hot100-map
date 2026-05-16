// 各カテゴリの設定。新カテゴリ追加時はここに 1 エントリ追加するだけで
// データ読み込み・state 初期値・マーカー描画・設定 Switch がすべて連動する。
export type CategoryConfig = {
  label: string; // 表示用フルラベル（例: "ラーメン百名店"）
  shortLabel: string; // Switch ラベル等で使う短いラベル
  emoji: string; // マーカーに表示する絵文字
  switchColor: string; // 設定ダイアログの Switch カラー（CSS color）
  dataFile: string; // data/ 配下の JSON ファイル名
  defaultVisible: boolean; // 初期表示状態
};

export const CATEGORIES = {
  ramen: {
    label: "ラーメン百名店",
    shortLabel: "ラーメン",
    emoji: "🍜",
    switchColor: "#ED6C02",
    dataFile: "ramen.json",
    defaultVisible: true,
  },
  udon: {
    label: "うどん百名店",
    shortLabel: "うどん",
    emoji: "🥣",
    switchColor: "#1976D2",
    dataFile: "udon.json",
    defaultVisible: false,
  },
  curry: {
    label: "カレー百名店",
    shortLabel: "カレー",
    emoji: "🍛",
    switchColor: "#D4A017",
    dataFile: "curry.json",
    defaultVisible: false,
  },
  shokudo: {
    label: "食堂百名店",
    shortLabel: "食堂",
    emoji: "🍚",
    switchColor: "#795548",
    dataFile: "shokudo.json",
    defaultVisible: false,
  },
  italian: {
    label: "イタリアン百名店",
    shortLabel: "イタリアン",
    emoji: "🍝",
    switchColor: "#388E3C",
    dataFile: "italian.json",
    defaultVisible: false,
  },
  chinese: {
    label: "中国料理百名店",
    shortLabel: "中国料理",
    emoji: "🥮",
    switchColor: "#C62828",
    dataFile: "chinese.json",
    defaultVisible: false,
  },
} as const satisfies Record<string, CategoryConfig>;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
