import React, { forwardRef } from "react";

const SectionContainer = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    isInnerContent?: boolean;
    className?: string;
    contentContainerClassName?: string;
  }
>(({ children, isInnerContent, className, contentContainerClassName }, ref) => {
  return (
    <section ref={ref} className={`${contentContainerClassName}`}>
      <div
        className={`${className} ${
          isInnerContent ? "" : "p-6 max-w-[1550px] w-full mx-auto"
        } relative`}
      >
        {children}
      </div>
    </section>
  );
});

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
