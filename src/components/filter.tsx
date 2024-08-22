import { Children } from "react";
import { Filter, PostDataType } from "../types";

interface FilterProps {
  onClose: () => void;
  headers: { header: string }[];
  mainData: PostDataType[];
  setData: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  setFilterData: React.Dispatch<React.SetStateAction<Filter[]>>;
  filterData: Filter[];
}
export default function FilterTable({
  onClose,
  headers,
  mainData,
  setData,
  setFilterData,
  filterData,
}: FilterProps) {
  const addFilter = () => {
    setFilterData([...filterData, { header: "", condition: "=", value: "" }]);
  };

  const updateFilter = (
    index: number,
    field: keyof Filter,
    value: string | number
  ) => {
    const updatedFilters = filterData.map((filter, i) =>
      i === index ? { ...filter, [field]: value } : filter
    );
    setFilterData(updatedFilters);
  };

  const deleteFilter = (index: number) => {
    const updatedFilters = filterData.filter((_, i) => i !== index);
    setFilterData(updatedFilters);
  };

  const applyFilters = () => {
    const filteredArr = mainData.filter((item) => {
      return filterData.every((element) => {
        switch (element.condition) {
          case ">":
            return item[element.header] > element.value;
          case "<":
            return item[element.header] < element.value;
          case "=":
            return item[element.header] == element.value;
          case "contain":
            return item[element.header].includes(element.value);
          default:
            return false;
        }
      });
    });

    setData(filteredArr);
  };

  const onSearch = () => {
    //reset table to default
    if (filterData.length === 1 && filterData[0].value === "") {
      setData(mainData);
      return;
    }
    applyFilters();
    onClose();
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Filter</h2>
          {filterData.map((filter, index) => (
            <div key={index} className="flex items-center ">
              <div className="filter-row">
                <select
                  className=" "
                  value={filter.header}
                  onChange={(e) =>
                    updateFilter(index, "header", e.target.value)
                  }
                >
                  <option value="">Select Header</option>
                  {Children.toArray(
                    headers.map(({ header }) => (
                      <option value={header}>{header}</option>
                    ))
                  )}
                </select>
                <select
                  value={filter.condition}
                  onChange={(e) =>
                    updateFilter(index, "condition", e.target.value)
                  }
                >
                  <option value="=">=</option>
                  <option value=">">&lt;</option>
                  <option value="<">&gt;</option>
                  <option value="contain">contain</option>
                </select>
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => updateFilter(index, "value", e.target.value)}
                />
              </div>
              {index !== 0 && (
                <button onClick={() => deleteFilter(index)}>
                  <img
                    alt="delete"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTElEQVR4nMXUvUqcQRTG8R9+YgKKoEUUFEQbtRCtgmAT7EWRgHaBbLN3kFyDjaWt4CVopVdgtxbZUkEwGC0UISbCysARhpd1P9zCAw+cOXPmP3POvPPyDtaN5VBXp7A+nOB/KPm9nQC3cY1PGMMfbLW6eAOnBV3iPhvfR6yYt14POIlSLDgIv5EOIreEiUYnPUO5hYrKkdvUisDv6Al96xQ4ghpmQ7WIvRk4GpC5UPp0hrO5z50Ax7GCH6jiH86xk23SFrA/PuxaHVUjty3gz/C/ohL+FVajFfvtAqvhV2J8jEUcRfwvPjQDfsTv6N9jVmKCJdstlD7dDJjbRVbmYsDmsvKfMFQPmHbfqxPfiYWrWZkVzEcPD1/r4Rc84A63ofRml/ArFudlpvENZl4DJku/qzVsZlqIV5JuM13AS5npZA1hrdgApjBYnHkGHud2OBm7/+QAAAAASUVORK5CYII="
                  />{" "}
                </button>
              )}
            </div>
          ))}
          <button className="filterButton" onClick={addFilter}>
            Add New Filter +
          </button>

          <div className="modal-actions">
            <button className="mainButton" onClick={onSearch}>
              Search
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
