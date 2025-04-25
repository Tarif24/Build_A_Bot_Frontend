import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const AddDataForm = () => {
    const [name, setName] = useState("");
    const [URLText, setURLText] = useState("");
    const [URLList, setURLList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Data Added To Collection:", name);
        // Delete the collection from the database using the name

        setName("");
    };

    const handleAddURL = () => {
        if (URLText.trim() !== "") {
            setURLList((prevList) => [...prevList, URLText]);
        }
        setURLText("");
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
                        Select a collection
                    </option>
                    <option value="Collection-1">Collection 1</option>
                    <option value="Collection-2">Collection 2</option>
                    <option value="Collection-3">Collection 3</option>
                </select>
            </div>
            <div>
                <label
                    htmlFor="url-input"
                    className="block text-gray-700 font-bold mb-2"
                >
                    URL Input
                </label>
                <div
                    className="relative h-[3rem] w-full border-1 border-black rounded mb-4"
                    id="url-input"
                    name="url-input"
                >
                    <input
                        type="text"
                        placeholder="Add the URL to your data..."
                        className="relative h-full px-5 w-full focus:outline-none rounded-[5rem]"
                        value={URLText}
                        onChange={(e) => setURLText(e.target.value)}
                    />
                    <button
                        className="absolute right-2 top-0 h-full hover:cursor-pointer transition duration-300 ease-in-out"
                        type="button"
                        onClick={handleAddURL}
                    >
                        <CiCirclePlus size="2.5rem" color="black" />
                    </button>
                </div>
                <div className="flex flex-col gap-2 mb-4 max-h-[10rem] overflow-y-auto border-1 rounded p-4">
                    {URLList.map((url, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 rounded-full px-4 py-2"
                        >
                            {url}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Data
                </button>
            </div>
        </form>
    );
};

export default AddDataForm;
