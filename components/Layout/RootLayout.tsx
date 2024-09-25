import React, { forwardRef } from "react";

const RootLayout = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <main ref={ref} className={`${className}relative font-sf-pro`}>
      {children}
    </main>
  );
});

RootLayout.displayName = "RootLayout";

export default RootLayout;
