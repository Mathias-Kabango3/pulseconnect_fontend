import React from "react";

const DoctorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <footer></footer>
    </div>
  );
};

export default DoctorsLayout;
