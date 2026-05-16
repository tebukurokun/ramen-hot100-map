// 各カテゴリの設定。新カテゴリ追加時はここに 1 エントリ追加するだけで
// データ読み込み・state 初期値・マーカー描画・チップバー/シートがすべて連動する。
export type CategoryConfig = {
  label: string; // 表示用フルラベル（例: "ラーメン百名店"）
  shortLabel: string; // チップ/トグル等で使う短いラベル
  emoji: string; // マーカー・チップに表示する絵文字
  switchColor: string; // ON 時のチップ背景色（CSS color）
  dataFile: string; // data/ 配下の JSON ファイル名
  defaultVisible: boolean; // 初期表示状態
  defaultPinned: boolean; // チップバーへの初期ピン留め状態
  section: SectionKey; // ボトムシートでのグルーピング
};

// セクション定義（ボトムシートでの並び順は宣言順）
export const SECTIONS = {
  noodles: { label: "麺類" },
  rice: { label: "ご飯・カレー" },
  western: { label: "洋食" },
  chinese: { label: "中華" },
  meat: { label: "肉料理" },
  bakery: { label: "パン・スイーツ" },
  other: { label: "その他" },
} as const satisfies Record<string, { label: string }>;

export type SectionKey = keyof typeof SECTIONS;
export const SECTION_KEYS = Object.keys(SECTIONS) as SectionKey[];

export const CATEGORIES = {
  ramen: {
    label: "ラーメン百名店",
    shortLabel: "ラーメン",
    emoji: "🍜",
    switchColor: "#ED6C02",
    dataFile: "ramen.json",
    defaultVisible: true,
    defaultPinned: true,
    section: "noodles",
  },
  udon: {
    label: "うどん百名店",
    shortLabel: "うどん",
    emoji: "🥣",
    switchColor: "#1976D2",
    dataFile: "udon.json",
    defaultVisible: false,
    defaultPinned: false,
    section: "noodles",
  },
  curry: {
    label: "カレー百名店",
    shortLabel: "カレー",
    emoji: "🍛",
    switchColor: "#D4A017",
    dataFile: "curry.json",
    defaultVisible: false,
    defaultPinned: false,
    section: "rice",
  },
  shokudo: {
    label: "食堂百名店",
    shortLabel: "食堂",
    emoji: "🍚",
    switchColor: "#795548",
    dataFile: "shokudo.json",
    defaultVisible: false,
    defaultPinned: false,
    section: "rice",
  },
  italian: {
    label: "イタリアン百名店",
    shortLabel: "イタリアン",
    emoji: "🍝",
    switchColor: "#388E3C",
    dataFile: "italian.json",
    defaultVisible: false,
    defaultPinned: false,
    section: "western",
  },
  chinese: {
    label: "中国料理百名店",
    shortLabel: "中国料理",
    emoji: "🥮",
    switchColor: "#C62828",
    dataFile: "chinese.json",
    defaultVisible: false,
    defaultPinned: false,
    section: "chinese",
  },
} as const satisfies Record<string, CategoryConfig>;

export type CategoryKey = keyof typeof CATEGORIES;

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
