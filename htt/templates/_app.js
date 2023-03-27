import "../styles/globals.css";
import "../styles/Banner.css";
import "../styles/GlowingButton.css";
import "../styles/Home.css";
import "../styles/Shine-on-hover.scss";

// import { Raleway } from "@next/font/google";
// const inter = Raleway({ subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <main className={montserrat.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}

export default MyApp;
