import React from "react";
import SectionTitle from "./SectionTitle";

function Section({ title, children, className = "mt-0" }) {
  return (
    <section className={className}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}

export default Section;
