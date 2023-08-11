// Detail component handles editing and saving of items
const Detail = ({ selectedItem, setSelectedItem, itemsData, setItemsData }) => {
    // Update input fields when values change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    }

    // Save edited item or create new item
    const handleSave = async () => {
        const areFieldsValid = selectedItem ? Object.values(selectedItem).every(value => value !== '') : false;

        if (!areFieldsValid) {
            return alert("Please fill in all fields before saving.");
        }

        try {
            const response = await fetch(
                selectedItem._id ? `/api/items/${selectedItem._id}` : `/api/items/`, {
                method: selectedItem._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedItem)
            }
            );

            if (response.ok) {
                const responseData = await response.json();
                if (selectedItem._id) {
                    const updatedItemsData = itemsData.map((item) =>
                        item._id === selectedItem._id ? selectedItem : item
                    );
                    setItemsData(updatedItemsData);
                } else {
                    setItemsData([...itemsData, responseData]);
                }
                setSelectedItem(null);
            } else {
                alert("Failed to save item!");
            }
        } catch (error) {
            alert("Failed while saving item!");
        }
    }

    // Delete currently selected item
    const handleDelete = async () => {
        if (!selectedItem?._id) return alert("Please selected an item to delete!");
        try {
            const response = await fetch(`/api/items/${selectedItem._id}`, { method: 'DELETE' });

            if (response.ok) {
                const newItemsData = itemsData.filter(item => item._id !== selectedItem._id);
                setItemsData(newItemsData);
                setSelectedItem(null);
            } else {
                alert("Error while deleting item!");
            }
        } catch (error) {
            alert("Error while deleting item!");
        }
    }
    return (
        <>
            <h2>Update or Add Item</h2>
            <p>To update or delete an item, please select the item from the list.</p>
            {(
                <form action="#">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={selectedItem?.name || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="make">Make:</label>
                        <input type="text" id="make" name="make" value={selectedItem?.make || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="model">Model:</label>
                        <input type="text" id="model" name="model" value={selectedItem?.model || ''} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="year">Year:</label>
                        <input type="number" id="year" name="year" value={selectedItem?.year || ''} onChange={handleInputChange} />
                    </div>
                    <button type="button" className="save-btn" onClick={handleSave}>Save</button>
                    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
                </form>
            )}
        </>
    )
}

// List component displays items in the list
const List = ({ item, onItemClick }) => {
    return (
        <li className="item" onClick={() => onItemClick(item)}>
            <h3 className="item-title">{item.name}</h3>
            <ul className="item-details">
                <li><strong>Make:</strong> {item.make}</li>
                <li><strong>Model:</strong> {item.model}</li>
                <li><strong>Year:</strong> {item.year}</li>
            </ul>
        </li>
    )
}

// Main App component for rendering the whole application
const App = () => {
    const [selectedItem, setSelectedItem] = React.useState({
        name: '',
        make: '',
        model: '',
        year: ''
    });
    const [itemsData, setItemsData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/items");
                const data = await response.json();
                setItemsData(data);
            } catch (error) {
                alert("Failed while fetching item list!");
            }
        }

        fetchData();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }

    return (
        <div className="container">
            <h2>Item List</h2>
            <ul className="item-list">
                {itemsData.map(item => {
                    return <List key={item._id} item={item} onItemClick={handleItemClick} />
                })}
            </ul>
            <Detail selectedItem={selectedItem} setSelectedItem={setSelectedItem} itemsData={itemsData} setItemsData={setItemsData} />
        </div>
    )
}

// Render the App component in the root element
ReactDOM.render(<App />, document.getElementById("root"));