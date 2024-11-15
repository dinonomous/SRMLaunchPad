import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface BreadcrumbsProps {
  slug: string[];
  handleBreadcrumbClick: (folderSlug: string[]) => void;
}

const BreadcrumbsComponent: React.FC<BreadcrumbsProps> = ({
  slug,
  handleBreadcrumbClick,
}) => {
  return (
    <div className="px-8 pb-4">
      {slug.length - 1 > 0 ? (
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<Typography className="dark:text-white">/</Typography>}
        >
          {slug && slug.length > 0 ? (
            slug.slice(1).map((folderName, index) => {
              const folderSlug = slug.slice(0, index + 2);
              const isLastItem = index === slug.length - 2; // Check if it's the last item

              return (
                <div className="flex items-center text-xl" key={index}>
                  <Link
                    underline="hover"
                    color="white"
                    onClick={() => handleBreadcrumbClick(folderSlug)}
                    className={isLastItem ? "" : "max-w-[200px] truncate"} // Apply truncate only if it's not the last item
                    title={folderName} // Show full text on hover
                  >
                    {folderName}
                  </Link>
                </div>
              );
            })
          ) : (
            <Typography sx={{ color: "white" }}>Root</Typography>
          )}
        </Breadcrumbs>
      ) : (
        <Typography sx={{ color: "white" }}>Open a file</Typography>
      )}
    </div>
  );
};

export default BreadcrumbsComponent;
