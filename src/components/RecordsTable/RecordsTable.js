import { Button } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { request } from "../../services/axios_helper";

const RecordsTable = () => {

    const [data, setData] = useState([{id: 1}])

    useEffect(() =>{
        getAllRecords();
    },[]);

    const getAllRecords= () => {
        request("GET","/api/records/all",{})
        .then((response) => {
            setData(response.data)
        })
    }
    
    const columns = useMemo(
        () => [
            {
              Header: "Id",
              accessor: "id"                
            },
            {
                Header: "Operation",
                accessor: "operation.type"                
            },
            {
                Header: "Operation Cost",
                accessor: "operation.cost"                
            },
            {
                Header: "Date",
                accessor: "date"                
            },
            {
                Header: "Response",
                accessor: "operationResponse"                
            },
            {
                Header: "Balance",
                accessor: "userBalance"                
            }
          ],
          []
        );

        const props = useTable(
            {
              columns,
              data
            },
            useGlobalFilter, // useGlobalFilter!
            usePagination
          );

          const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            setGlobalFilter,
            state,
            page, // Instead of using 'rows', we'll use page,
            // which has only the rows for the active page
        
            // The rest of these things are super handy, too ;)
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize, globalFilter }
          } = props;
          useEffect(() => {
            // props.dispatch({ type: actions.resetPage })
            console.log(globalFilter);
          }, [globalFilter]);

    const handleDelete= (id)=> {
        request("DELETE", "/api/records/"+id,{})
        .then((response) =>            
            getAllRecords()
        );
    }

    const subs = (str) => {
        if(str && str.length>0){
            const newval = str.split(",").map(s => <p> {s} </p>)
            return newval;
        }
        
    }

    const formatDate = (dt) => {
        console.log(dt);
        return format(dt, "MMM dd, yyyy HH:mm:ss");
        
    }

     
    return (
        <>
        <div className="row">
            <div className="col-6">
                 <div className="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Search:</span>
                    <input
                        type="text"
                        className="form-control"
                        value={globalFilter || ""}
                        onChange={e => setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>
        </div>
        <div class="table-responsive">
        <table {...getTableProps()} className="table table-fixed">
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="table-dark">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                        </th>
                    ))}
                    <th></th>
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    console.log()
                    if(cell.column.Header === 'Response'){
                        const val = subs(cell.value);
                        return (
                    
                            <td {...cell.getCellProps()}>{val}</td>
                          );
                    }else if(cell.column.Header === 'Date'){
                        if(cell.value){
                        const val = formatDate(cell.value);
                        return (
                    
                            <td {...cell.getCellProps()}>{val}</td>
                          );
                        } else{return (
                    
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                          );}
                    } else {
                  return (
                    
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                }
                })}
                <td>
                    <Button variant="outlined" startIcon={<GridDeleteIcon/>} color="error" onClick={() => handleDelete(row.original.id)}><i className="bi-trash"></i></Button>
                    </td> 
              </tr>
            );
          })}
        </tbody>
        </table>

        </div>
        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
      
        </>
    );
} 

export default RecordsTable;