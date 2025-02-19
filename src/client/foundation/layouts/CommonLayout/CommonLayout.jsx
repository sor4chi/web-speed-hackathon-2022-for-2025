import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "../../components/navs/Footer";
import { Header } from "../../components/navs/Header/Header";

export const CommonLayout = () => {
  return (
    <Suspense fallback={null}>
      <div>
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
};
