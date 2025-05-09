import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const AddDataForm = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    const [name, setName] = useState("");
    const [URLText, setURLText] = useState("");
    const [URLList, setURLList] = useState([]);

    const [RAGList, setRAGList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/getAllRAGBotCollectionsByName`)
            .then((response) => response.json())
            .then((data) => {
                setRAGList(data);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (URLList.length === 0) {
            alert("Please add at least one URL.");
            setIsLoading(false);
            return;
        }

        const RAGAddData = {
            collectionName: name,
            links: URLList,
        };

        const responseJSON = await fetch(`${API_URL}/addDataToRAGBot`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RAGAddData),
        });

        const response = await responseJSON.json();

        if (response.validLinks.length === 0) {
            toast.error("Failed to add data. No valid links given.");
        } else if (response.validLinks.length !== URLList.length) {
            toast.warning(
                `Data Added To ${name} Successfully, but some links were invalid.`
            );
        } else {
            toast.success(`Data Added To ${name} Successfully`);
        }

        setName("");
        setURLText("");
        setURLList([]);
        setIsLoading(false);
    };

    const handleDeleteURL = (index) => {
        setURLList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleAddURL = () => {
        if (URLText.trim() !== "") {
            setURLList((prevList) => [...prevList, URLText]);
        }
        setURLText("");
    };

    if (isLoading) {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <>
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
                        {RAGList.map((rag, index) => (
                            <option key={index} value={rag}>
                                {rag}
                            </option>
                        ))}
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
                            <CiCirclePlus
                                size="2.5rem"
                                className="hover:text-gray-500 transition duration-300 ease-in-out"
                            />
                        </button>
                    </div>
                    <label
                        htmlFor="url-list"
                        className={`${
                            URLList.length !== 0 ? "block" : "hidden"
                        } text-gray-700 font-bold mb-2`}
                    >
                        URL List
                    </label>
                    <div
                        className={`${
                            URLList.length !== 0 ? "flex" : "hidden"
                        } flex-col gap-2 mb-4 max-h-[10rem] overflow-y-auto border-1 rounded p-4`}
                        id="url-list"
                        name="url-list"
                    >
                        {URLList.map((url, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-200 rounded-full px-4 py-2"
                            >
                                {url}
                                <div
                                    className="absolute right-3 top-0 h-full flex justify-center items-center hover:cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => handleDeleteURL(index)}
                                >
                                    <FaRegTrashAlt
                                        size="1.25rem"
                                        className="hover:text-red-500 transition duration-300 ease-in-out"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Data
                    </button>
                </div>
            </form>
            {isLoading && (
                <div className="absolute flex w-[100vw] h-[100vh] -top-4 left-0 justify-center items-center mt-4 bg-black opacity-50">
                    <ClipLoader
                        color="#6e6e6e"
                        loading={isLoading}
                        size={200}
                        speedMultiplier={1}
                    />
                </div>
            )}
        </>
    );
};

export default AddDataForm;
