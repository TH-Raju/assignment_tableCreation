import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const DataTables = () => {
    const [data, setData] = useState([])

    const columns = [
        {
            name: 'First Name',
            selector: row => row.first,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.last,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Result',
            selector: row => row.result,
            sortable: true,
        },
    ];


    //   tableData.json file in ../../public/tableData.json

    useEffect(() => {
        fetch('tableData.json')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])


    const conditionalRowStyles = [
        {
            when: row => row.result === "Failed",
            style: {
                color: 'red',
            },
        },
        {
            when: row => row.result === "Passed",
            style: {
                color: 'green',
            },
        },
    ];

    const customSort = (rows, selector, direction) => {
        return rows.sort((rowA, rowB) => {
            const aField = selector(rowA)
            const bField = selector(rowB)
            let comparison = 0;

            if (aField > bField) {
                comparison = 1;
            } else if (aField < bField) {
                comparison = -1;
            }

            return direction === 'desc' ? comparison * -1 : comparison;
        });
    };



    return <DataTable title="Assignment Result"
        columns={columns}
        data={data}
        sortFunction={customSort}
        selectableRows
        selectableRowsHighlight
        dense
        conditionalRowStyles={conditionalRowStyles}
    />

};

export default DataTables;