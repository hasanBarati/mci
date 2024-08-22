import { useState } from "react";
import FilterTable from "./components/filter";
import { Layout } from "./components/layout";
import Table from "./components/table/table";
import { TableColumns } from "./components/table/table-columns";
import { usePaginate } from "./components/table/usePaginate";
import { useFetchData } from "./hooks/useFetchData";
import { Filter } from "./types";

const App = () => {
  const { data, mainData, setData, fetchData } = useFetchData();
  const { page, setPage, currentRecords, totalPages, setRecordPerPage } =
    usePaginate(data);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState<Filter[]>([
    { header: TableColumns[0].header, condition: "=", value: "" },
  ]);

  return (
    <Layout>
      <Table
        data={currentRecords}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        headers={TableColumns}
        setRecordPerPage={setRecordPerPage}
        onFilter={() => setOpenFilter(true)}
        loading={fetchData}
      />
      {openFilter && (
        <FilterTable
          setFilterData={setFilterData}
          filterData={filterData}
          headers={TableColumns}
          onClose={() => setOpenFilter(false)}
          mainData={mainData}
          setData={setData}
        />
      )}
    </Layout>
  );
};

export default App;
