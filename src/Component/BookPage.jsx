import React, { useState } from "react";
import AddBooks from "../Pages/AddBooks";
import AllBooks from "../Pages/AllBooks";
import UpdateBook from "../Pages/UpdateBook";

const BooksPage = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleBookAdded = () => setRefreshTrigger(prev => prev + 1);
    const handleDataChange = () => setRefreshTrigger(prev => prev + 1);

    return (
        <>
            <UpdateBook onBookUpdated={handleDataChange} />
            <AddBooks onBookAdded={handleBookAdded} />
            <AllBooks refreshTriggerProp={refreshTrigger} />
        </>
    );
};

export default BooksPage;
