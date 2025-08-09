import Link from "next/link";

const AboutPage = (): JSX.Element => {
  return (
    <div>
      <h1>About</h1>
      <div>
        <p>ラーメン百名店、うどん百名店等の情報を検索するサイトです</p>
      </div>
      <div>
        <p>
          <Link href="/">戻る</Link>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
