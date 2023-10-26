import React, { useState, useEffect } from 'react';
import 'react-dropdown/style.css';

function SymptomOptions() {

    const [data, setData] = useState(null);
    const [names, setNames] = useState([]);

    const apiGet = () => {
        fetch(`${process.env.REACT_APP_API_URL}/symptoms/`)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setData(json);

        // const options = json.map(item => item.name);
        const options = json.map(item => <option value={item.id}>{item.name}</option>);
        setNames(options);
        })
    }

    useEffect(() => {
        apiGet();
        }, 
        []
    );

    return (
        names
    );
  }

  export default SymptomOptions;