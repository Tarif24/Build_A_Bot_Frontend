import React, { useState } from "react";

const DeleteCollectionForm = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Collection deleted:", name);
        // Delete the collection from the database using the name

        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Collection Name
                </label>
                <select
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                    {/* fill options with collection names from the database */}
                    <option value="" disabled>
                        Select a collection to delete
                    </option>
                    <option value="Collection-1">Collection 1</option>
                    <option value="Collection-2">Collection 2</option>
                    <option value="Collection-3">Collection 3</option>
                </select>
            </div>
            <div>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Delete Collection
                </button>
            </div>
        </form>
    );
};

export default DeleteCollectionForm;
