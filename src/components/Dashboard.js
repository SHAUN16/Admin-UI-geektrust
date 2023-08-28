import React from "react";
import Pagination from './Pagination';
import { Button } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import Table from './Table';
import './dashboard.scss';
import SearchBar from "./SearchBar";

let pageSize = 10;

const Dashboard = ({
    userData,
    setUserData,
    originalData,
    setOriginalData,
    handleEdit,
    handleEditValues,
}) => {


    const [currentPage, setCurrentPage] = useState(1);
    const [mainCheckbox, setMainCheckbox] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchText, setText] = useState("");


    const resetToFirstPageAndClearSearch = (newData) => {
        setCurrentPage((prevPage) => {
          const totalCount = newData.length;
          const totalPageCount = Math.ceil(totalCount / pageSize);
          if (prevPage === 1) return 1;
          if (totalPageCount >= prevPage) return prevPage;
          return (prevPage - 1);
        }
        );
        setText((prevText)=>"");
      }
    

    const onSearch = (event) => {
        const text = event.target.value.toLowerCase();
        const nData = [...originalData];

        const newData = nData.filter((user) => {
            return (user.name.toLowerCase().includes(text)
                || user.email.toLowerCase().includes(text)
                || user.role.toLowerCase().includes(text)
            )
        })

        setUserData(newData);
    }

    const handleRowSelection = (rowId, mainCheckbox) => {

        if (rowId === -1) {
            if (mainCheckbox) {
                const firstPageIdx = pageSize * (currentPage - 1);
                const lastPageIdx = firstPageIdx + pageSize;
                let data = userData.slice(firstPageIdx, lastPageIdx);
                const selectedRowIds = data.map(user => user.id);
                setSelectedRows(prevSelectedRows => [...prevSelectedRows, ...selectedRowIds]);
            }

            else setSelectedRows([]);

        }
        else {
            if (selectedRows.includes(rowId)) {
                setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== rowId));
            } else {
                setSelectedRows([...selectedRows, rowId]);
            }
        }
    }



    const handleDelete = (id) => {
        let newData;
        if (id) {
            newData = originalData.filter((row) => row.id !== id);

        }
        else {
            newData = originalData.filter((row) => !selectedRows.includes(row.id));
        }
        setUserData(newData);
        setOriginalData(newData); // set the original data to new data to filter out deleted data on displaying the rows
        setSelectedRows([]);
        resetToFirstPageAndClearSearch(newData);
    };



    const currentTable = useMemo(() => {
        setMainCheckbox(false);
        setSelectedRows([]); //reset the selected rows on page change
        const firstPageIdx = pageSize * (currentPage - 1);
        const lastPageIdx = firstPageIdx + pageSize;
        return userData.slice(firstPageIdx, lastPageIdx);
    }, [currentPage, userData])

    return (
        <>
            {originalData.length ?
                (
                    <>
                        <SearchBar onChange={onSearch} setText={setText} searchText={searchText} />
                        <Table
                            currentTable={currentTable.length ? currentTable : userData.slice(0, 10)}
                            setMainCheckbox={setMainCheckbox}
                            mainCheckbox={mainCheckbox}
                            handleDelete={handleDelete}
                            handleRowSelection={handleRowSelection}
                            selectedRows={selectedRows}
                            handleEdit={handleEdit}
                            handleConfirmEdit={handleEditValues}
                        />
                        <Pagination
                            dataTestId = "pagination-bar"
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={userData.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                        <Button
                            className="delete-btn"
                            style={{ margin: "2rem"}}
                            color="error"
                            variant="outlined"
                            disabled={selectedRows.length === 0}
                            onClick={() => handleDelete()}
                        >
                            Delete Selected
                        </Button>

                    </>
                ) : (
                    <>
                        <section className="enpty-table">
                            <h2>No members left. Refresh to get members back </h2>
                        </section>
                    </>
                )
            }
        </>
    );
}

export default Dashboard;