import Link from "next/link";

const AboutPage = (): JSX.Element => {
  return (
    <div>
      <h1>About</h1>
      <p>ラーメン百名店、うどん百名店 の情報を検索するサイトです</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </div>
  );
};

export default AboutPage;
