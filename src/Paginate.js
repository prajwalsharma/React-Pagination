import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = (props) => {
  return (
    <div className="pagination-container">
      <li
        onClick={props.handleFirstPageClick}
        className={`previousClassName ${
          props.loading && "disableButtonClick2"
        } `}
      >
        {"<<"}
      </li>
      <ReactPaginate
        previousLabel={"← Previous"}
        pageRangeDisplayed="1"
        marginPagesDisplayed="2"
        nextLabel={"Next →"}
        pageCount={props.pageCount}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        previousClassName={`previousClassName ${
          props.loading && "disableButtonClick"
        } `}
        previousLinkClassName={`previousClassName ${
          props.loading && "disableButtonClick2"
        } `}
        nextClassName={`nextClassName ${
          props.loading && "disableButtonClick"
        } `}
        nextLinkClassName={`nextClassName ${
          props.loading && "disableButtonClick2"
        } `}
        disabledClassName={"disabledClassName"}
        activeClassName={"pagination_link_active"}
        pageClassName={"paginationPage"}
        forcePage={props.currentPage}
      />
      <li
        onClick={props.handleLastPageClick}
        className={`nextClassName ${props.loading && "disableButtonClick2"} `}
      >
        {">>"}
      </li>
    </div>
  );
};

export default Paginate;
