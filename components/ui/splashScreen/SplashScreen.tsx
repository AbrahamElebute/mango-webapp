import React from "react";
import { Logo } from "@/assets/Logo";
import styles from "./SplashScreen.module.css";
const SplashScreen = () => {
  return (
    <section className="bg-background h-screen w-screen fixed grid place-content-center">
      <div className={`${styles.logoContainer} flex flex-col items-center`}>
        <div className="!font-[900] text-6xl rounded-full grid place-content-center text-white bg-primary w-20 h-20">
          M
        </div>
        <Logo width={500} height={50} />
      </div>
    </section>
  );
};

export default SplashScreen;
