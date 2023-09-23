import React from "react";
import { Button, PageButton } from "./Button";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  // PencilAltIcon,
  // TrashIcon,
} from "@heroicons/react/24/solid";
import { classNames } from "./common/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./common/Icon";
import Avatar from "./common/Avatar";
// import { createTablePdf } from "../utils/statsHelpers";
import PDFButton from "./PdfButton";
// import { useAppContext } from "../context/AppState";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      {/* <label className="flex gap-x-2 items-baseline"> */}
      <label className="flex flex-col gap-y-2 items-baseline">
        <span className="text-mde-gray">Rechercher: </span>
        <input
          type="text"
          className="rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-ctamp-700 focus:ring-opacity-50"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Parmis ${count} éléments...`}
        />
      </label>
    </>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    // <label className="flex gap-x-2 items-baseline">
    <label className="flex flex-col gap-y-2 items-baseline">
      <span className="text-mde-gray">{render("Header")}: </span>
      <select
        className="rounded-md text-md py-2.5 pl-3 pr-10 text-left  text-mde-gray border border-gray-300 shadow-sm focus:border-ctamp-700 focus:ring focus:ring-ctam-primary focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">Voir tout</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        // status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        // status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        // status.startsWith("offline") ? "bg-red-100 text-red-800" : null
        status.startsWith("oui") ? "bg-green-100 text-green-800" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status.startsWith("non") ? "bg-red-100 text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function BooleanPill({ value }) {
  const status = value;

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        // status.startsWith("active") ? "bg-green-100 text-green-800" : null,
        // status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        // status.startsWith("offline") ? "bg-red-100 text-red-800" : null
        status === true ? "bg-green-100 text-green-800" : null,
        // status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
        status === false ? "bg-red-100 text-red-800" : null
      )}
    >
      {status === true ? "Oui" : "Non"}
    </span>
  );
}

// export function ButtonQcmPill({ value }) {
//   const { switchSlideOver, setSlideOverContent } = useAppContext();
//   const showDetails = () => {
//     setSlideOverContent({
//       title: "Details des QCM",
//       description: "Liste des résultats des QCM pour l'utilisateur: " + value,
//       body: <FicheQcm userEmail={value} />,
//     });
//     switchSlideOver(true);
//   };
//   return (
//     <div>
//       <Button onClick={() => showDetails()}>Voir les détails</Button>
//     </div>
//   );
// }

// export function ButtonEvaluationPill({ value }) {
//   const { switchSlideOver, setSlideOverContent } = useAppContext();
//   const showDetails = () => {
//     setSlideOverContent({
//       title: "Details de l'évaluation",
//       description: "Evaluation pour l'utilisateur: " + value,
//       body: <FicheEvaluation userEmail={value} />,
//     });
//     switchSlideOver(true);
//   };
//   return (
//     <div>
//       <Button onClick={() => showDetails()}>Voir les détails</Button>
//     </div>
//   );
// }

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <Avatar url={row.original[column.imgAccessor]} size={8} />
        {/* <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        /> */}
      </div>
      <div className="ml-4">
        <div className="text-xs font-medium text-gray-900">{value}</div>
        <div className="text-xs text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}

function Table({
  columns,
  data,
  modeExportation,
  withGlobalSearch = true,
  withExport = true,
  descriptionExportation = null,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    rows,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  return (
    <>
      <div className="sm:flex sm:gap-x-2">
        {withGlobalSearch && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}

        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
        {withExport && (
          <PDFButton
            realData={page}
            mode={modeExportation}
            description={descriptionExportation}
          />
        )}
      </div>
      {/* table */}
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                {/* <thead className="bg-gray-50"> */}
                <thead className="bg-mde-red">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          //   className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          className="group px-6 py-3 text-left text-xs font-medium text-mde-yellow uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-xs text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-mde-gray">
              Page <span className="font-medium">{state.pageIndex + 1}</span>{" "}
              sur <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full text-mde-gray rounded-md border px-3 py-2  border-gray-300 shadow-sm focus:border-mde-red focus:ring focus:ring-ctamp-700 focus:ring-opacity-50"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Afficher {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
