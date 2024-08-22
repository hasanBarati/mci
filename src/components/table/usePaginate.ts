import { useState } from "react";
import { PostDataType } from "../../types";

export const usePaginate = (data: PostDataType[]) => {
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordPerPage] = useState(10);

  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  return { page, setPage, currentRecords, totalPages, setRecordPerPage };
};
