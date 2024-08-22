import { Children } from "react";
import { ApiStatus, PostDataType } from "../../types";
import Loading from "../loading";
import { TableColumns } from "./table-columns";

interface TableProps {
  data: PostDataType[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  headers: TableColumns[];
  setRecordPerPage: (value: number) => void;
  onFilter: () => void;
  loading: ApiStatus;
}

const Table = ({
  data,
  page,
  setPage,
  totalPages,
  headers,
  setRecordPerPage,
  onFilter,
  loading,
}: TableProps) => {
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {Children.toArray( headers.map((header) => (
              <th>{header.header}</th>
            )))}
          </tr>
        </thead>
        <tbody >
          {loading === "PENDING" ? (
            <tr className="col-span-full  relative h-20">
              <td className="absolute w-full">
                <Loading />
              </td>
            </tr>
          ) : (
            data.map((record) => (
              <tr key={record.id}>
                {Children.toArray(headers.map((item) => (
                  <td>{record[item.header]}</td>
                )))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        <select
          onChange={(e) => {
            setRecordPerPage(+e.target.value);
          }}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <div className="flex gap-2">
          <button onClick={handlePrevious} disabled={page === 1}>
            &lt;
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={page === totalPages}>
            &gt;
          </button>
        </div>
        <button className="filter-button" onClick={onFilter}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default Table;
