/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
          >
            <button onClick={() => onPageChange(pageNumber)} className="page-link">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

RoomPaginator.propTypes = {
  currentPage: PropTypes.number.isRequired, // currentPage prop should be a number and required
  totalPages: PropTypes.number.isRequired, // totalPages prop should be a number and required
  onPageChange: PropTypes.func.isRequired, // onPageChange prop should be a function and required
};

export default RoomPaginator;
