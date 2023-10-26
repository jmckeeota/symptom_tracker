import React, { useState, useEffect } from 'react';

function CreateEntry() {
    const [sections, setSections] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [inputName, setInputName] = useState('');
    const [names, setNames] = useState([]);
    const [data, setData] = useState(null); // Unused. Maybe you will need this later?

    useEffect(() => {
        fetchSymptoms();
        }, 
        []
    );

    const resetForm = () => {
        setInputName('');
        setSections([]);
    };

    const fetchSymptoms = async () => {
        console.log(`${process.env.REACT_APP_API_URL}`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/symptoms/`);
            const json = await response.json();
            const options = json.map(item => <option key={item.id} value={item.id}>{item.name}</option>);
            setNames(options);
        } catch (error) {
            console.error("Error fetching symptoms:", error);
        }
    };

    const handleAddSection = () => {
        setSections([...sections, {
            symptom_select: 1, // Default value
            symptom_description: '' // Default value
            }
        ]);
    };

    const handleRemoveSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };

    const handleSectionChange = (index, key, value) => {
        const updatedSections = [...sections];
        updatedSections[index][key] = value;
        setSections(updatedSections);
    }

    const handleNameChange = (event) => {
        setInputName(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: inputName,
            symptom_item_list: sections.map(section => ({
                symptom_id: section.symptom_select,
                symptom_description: section.symptom_description
                })
            )
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/entries/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();
            setResponseMessage(responseData.message); 
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <EntryNameInput value={inputName} onChange={handleNameChange} />
            {sections.map((section, index) => (
                <SymptomSection 
                    key={index} 
                    section={section} 
                    index={index}
                    names={names}
                    onChange={handleSectionChange}
                    onRemove={() => handleRemoveSection(index)}
                />
                ))
            }
            <button type="button" onClick={handleAddSection}>Add Symptom Section</button>
            <button type="submit">Submit</button>
        </form>
    );
}

const EntryNameInput = ({ value, onChange }) => (
    <>
        <label htmlFor="name">Entry Name</label><br />
        <input 
            id="name" 
            type="text" 
            value={value}
            onChange={onChange}
        /><br />
    </>
);

const SymptomSection = ({ section, index, names, onChange, onRemove }) => (
    <div>
        <label htmlFor={`symptom_select_${index}`}>Select a symptom</label><br />
        <select
            id={`symptom_select_${index}`}
            value={section.symptom_select}
            onChange={e => onChange(index, 'symptom_select', e.target.value)}
        >
            {names}
        </select><br />

        <label htmlFor={`symptom_description_${index}`}>Describe details about the symptom</label><br />
        <input
            id={`symptom_description_${index}`}
            type="textarea"
            value={section.symptom_description}
            onChange={e => onChange(index, 'symptom_description', e.target.value)}
        /><br />
        <button type="button" onClick={onRemove}>Remove</button>
    </div>
);

export default CreateEntry;
