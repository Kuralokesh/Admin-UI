import React from "react";

import "./index.css";

const Pagination = ({ postPerPage, totalPosts, pageHandler, currentPage }) => {
  let pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalPosts / postPerPage + 1); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex flex-row justify-content-center">
      {pageNumbers.map((page) => (
        <div
          key={pageNumbers}
          className="pagebutton btn btn-secondary m-1 "
          onClick={() => pageHandler(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
