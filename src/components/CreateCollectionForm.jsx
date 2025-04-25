import React, { useState } from "react";

const CreateCollectionForm = () => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("New Collection Created:", name);
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
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Enter a unique collection name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Create Collection
                </button>
            </div>
        </form>
    );
};

export default CreateCollectionForm;
