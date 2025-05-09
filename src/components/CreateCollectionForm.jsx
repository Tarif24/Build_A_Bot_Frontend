import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const CreateCollectionForm = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [tone, setTone] = useState("");
    const [audience, setAudience] = useState("");
    const [unknown, setUnknown] = useState("");
    const [behavior, setBehavior] = useState("");
    const [URLText, setURLText] = useState("");
    const [URLList, setURLList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const RAGBot = {
            collectionName: name,
            specialization: specialization,
            tone: tone,
            audience: audience,
            unknown: unknown,
            behavior: behavior,
            links: URLList,
        };

        const responseJSON = await fetch(`${API_URL}/createRAGBot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RAGBot),
        });

        const response = await responseJSON.json();
        console.log("Response from server:", response);

        // Reset form fields
        setName("");
        setSpecialization("");
        setTone("");
        setAudience("");
        setUnknown("");
        setBehavior("");
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
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div>
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
                {/* SPECIALIZATION */}
                <div>
                    <label
                        htmlFor="specialization"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Specialization
                    </label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter a specialization for the bot"
                        required
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                    />
                </div>
                {/* TONE */}
                <div>
                    <label
                        htmlFor="tone"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Tone
                    </label>
                    <input
                        type="text"
                        id="tone"
                        name="tone"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter a tone for the bot"
                        required
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    />
                </div>
                {/* AUDIENCE */}
                <div>
                    <label
                        htmlFor="audience"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Audience
                    </label>
                    <input
                        type="text"
                        id="audience"
                        name="audience"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Enter a audience for the bot"
                        required
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                    />
                </div>
                {/* UNKNOWN */}
                <div>
                    <label
                        htmlFor="unknown"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Unknown
                    </label>
                    <textarea
                        id="unknown"
                        name="unknown"
                        className="border rounded w-full py-2 px-3"
                        rows="3"
                        placeholder="Enter what the bot should do when it doesn't know the answer"
                        required
                        value={unknown}
                        onChange={(e) => setUnknown(e.target.value)}
                    ></textarea>
                </div>
                {/* BEHAVIOR */}
                <div>
                    <label
                        htmlFor="behavior"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Behavior
                    </label>
                    <textarea
                        id="behavior"
                        name="behavior"
                        className="border rounded w-full py-2 px-3"
                        rows="3"
                        placeholder="Enter a overall behavior for the bot"
                        required
                        value={behavior}
                        onChange={(e) => setBehavior(e.target.value)}
                    ></textarea>
                </div>
                {/* URL INPUT */}
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
                        Create Collection
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

export default CreateCollectionForm;
