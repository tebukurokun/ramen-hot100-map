import dynamic from "next/dynamic";
import { JSX } from "react";

const MapComponent = dynamic(() => import("../components/Map"), { ssr: false });

const version = process.env.NEXT_PUBLIC_APP_VERSION;
console.info(`Hyakumeiten Map v${version}`);

const Home = (): JSX.Element => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default Home;
