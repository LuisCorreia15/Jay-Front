import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = (props) => (
  <div className="tb">
    <ContentLoader
      speed={2}
      width="100%"
      height={111}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="30" rx="5" ry="5" width="10%" height="10" />
      <rect x="0" y="50" rx="5" ry="5" width="20%" height="35" />
      <rect x="90%" y="40" rx="5" ry="5" width="10%" height="30" />
      <rect x="95%" y="75" rx="5" ry="5" width="5%" height="10" />
    </ContentLoader>
  </div>
);

export default SkeletonLoader;
