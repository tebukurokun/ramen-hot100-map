// 店データ
export type Shop = {
	name: string;
	url: string;
	address: string;
	code: string;
	lat: string;
	lng: string;
	id: string;
	category: ShopCategory;
};

// 店カテゴリー
export enum ShopCategory {
	ramen = "ラーメン百名店",
	udon = "うどん百名店",
	curry = "カレー百名店",
}

// 店カテゴリー表示設定
export type MarkerVisibility = {
	[key in keyof typeof ShopCategory]: boolean;
};
