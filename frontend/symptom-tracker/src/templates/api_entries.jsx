import React, { useState, useEffect } from 'react';

function Entries() {

    const [data, setData] = useState(null);

    const apiGet = () => {
        console.log(`${process.env.REACT_APP_API_URL}`)
        fetch(`${process.env.REACT_APP_API_URL}/entries/`)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        })
    }

    const deleteEntry = async (entryId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/entries/${entryId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Re-fetch the data to reflect changes or filter out the deleted entry
                apiGet();
            } else {
                console.error('Failed to delete the entry');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        apiGet();
        },
        []
    );

    const columns = [
        {
            header: 'Name',
            accessor: (entry) => entry.name
        },
        {
            header: 'Symptoms',
            accessor: (entry) => entry.symptom_item.map((si, idx, arr) => (
                <React.Fragment key={idx}>
                    {si.symptom.name} <br/>
                    {si.symptom_description}
                    {idx !== arr.length - 1 && <><br /></>}
                </React.Fragment>
            ))    },
            {
                header: 'Actions',
                accessor: (entry) => (
                    <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                )
            }
    ];

    return (
        <div>
            {data ? (
                <table border="1">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.id}>
                                {columns.map((col, index) => (
                                    <td key={index}>
                                        {col.accessor(entry)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Entries;