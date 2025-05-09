import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const DeleteCollectionForm = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    const [name, setName] = useState("");
    const [RAGList, setRAGList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        if (shouldFetch) {
            fetch(`${API_URL}/getAllRAGBotCollectionsByName`)
                .then((response) => response.json())
                .then((data) => {
                    setRAGList(data);
                    setShouldFetch(false); // Reset after fetching
                });
        }
    }, [shouldFetch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const responseJSON = await fetch(`${API_URL}/deleteRAGBot`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ collectionName: name }),
        });

        const response = await responseJSON.json();

        setName("");
        setIsLoading(false);
        setShouldFetch(true);
        toast.success(`Deleted RAG Bot ${name} Successfully`);
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
                            Select a collection to delete
                        </option>
                        {RAGList.map((rag, index) => (
                            <option key={index} value={rag}>
                                {rag}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Delete Collection
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

export default DeleteCollectionForm;
