import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Head from "next/head";
import Link from "next/link";
import { JSX } from "react";

const version = process.env.NEXT_PUBLIC_APP_VERSION;

/** 見出し + 本文のセクションカード */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element => (
  <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-gray-600">
      {children}
    </div>
  </section>
);

const AboutPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>About | Hyakumeiten Map</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
          {/* ヘッダー */}
          <header className="mb-8 text-center">
            <p className="text-5xl">🍜</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
              Hyakumeiten Map
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              食べログ百名店をマップで探せるサイト
            </p>
          </header>

          <div className="space-y-4">
            <Section title="このサイトについて">
              <p>
                Hyakumeiten Map は、食べログ百名店（ラーメン、うどん、カレー
                など）に選出されたお店を地図上で探せる非公式のファンサイトです。
              </p>
              <p>
                地図下部のチップやカテゴリ一覧から表示するジャンルを切り替えられます。マーカーをタップすると店名と食べログページへのリンクが表示されます。
              </p>
            </Section>

            <Section title="掲載データについて">
              <p>
                掲載している店舗情報は、食べログ百名店として公開されている情報をもとに、運営者が手動で取得・更新しています。そのため、更新には時間差があり、掲載内容の正確性・最新性は保証できません。営業時間や店舗の最新情報は、各店舗の食べログページ等でご確認ください。
              </p>
              <p>
                本サイトは食べログ（株式会社カカクコム）とは一切関係ありません。
              </p>
            </Section>

            <Section title="アクセス解析について">
              <p>
                本サイトでは、サービス向上のために Google Analytics および
                Vercel Analytics を利用しています。Google Analytics は Cookie
                等を使用して、閲覧ページや滞在時間などのトラフィックデータを収集します。このデータは匿名で収集されており、個人を特定するものではありません。
              </p>
              <p>
                収集を望まない場合は、ブラウザの設定で Cookie を無効にするか、
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Google アナリティクス オプトアウト アドオン
                </a>
                をご利用ください。詳しくは
                <a
                  href="https://policies.google.com/technologies/partner-sites?hl=ja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Google のポリシーと規約
                </a>
                をご覧ください。
              </p>
            </Section>

            <Section title="免責事項">
              <p>
                本サイトの利用により生じたいかなる損害についても、運営者は責任を負いません。あらかじめご了承ください。
              </p>
            </Section>
          </div>

          {/* フッター */}
          <footer className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              <ArrowBackIcon fontSize="small" />
              マップに戻る
            </Link>
            <p className="text-xs text-gray-400">
              Hyakumeiten Map v{version} — created by tebukuro
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
