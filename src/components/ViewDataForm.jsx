import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const ViewDataForm = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [tone, setTone] = useState("");
    const [audience, setAudience] = useState("");
    const [unknown, setUnknown] = useState("");
    const [behavior, setBehavior] = useState("");
    const [existingURLList, setExistingURLList] = useState([]);

    const [RAGList, setRAGList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/getAllRAGBotCollectionsByName`)
            .then((response) => response.json())
            .then((data) => {
                setRAGList(data);
            });
    }, []);

    const nameChangeHandler = async (e) => {
        setName(e.target.value);
        setIsLoading(true);

        const responseJSON = await fetch(
            `${API_URL}/getRAGBotInfoByCollectionName`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ collectionName: e.target.value }),
            }
        );

        const response = await responseJSON.json();

        setSpecialization(response.specialization);
        setTone(response.tone);
        setAudience(response.audience);
        setUnknown(response.unknown);
        setBehavior(response.behavior);
        setExistingURLList(response.links);
        setIsLoading(false);
    };

    if (isLoading) {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <>
            <form className="space-y-4">
                {/* NAME */}
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
                        onChange={(e) => nameChangeHandler(e)}
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
                <div
                    className={`flex flex-col gap-4 ${
                        name === "" || isLoading ? "hidden" : ""
                    }`}
                >
                    {/* SPECIALIZATION */}
                    <div>
                        <label
                            htmlFor="specialization"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Specialization
                        </label>
                        <h1 name="specialization" id="specialization">
                            {specialization}
                        </h1>
                    </div>
                    {/* TONE */}
                    <div>
                        <label
                            htmlFor="tone"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Tone
                        </label>
                        <h1 name="tone" id="tone">
                            {tone}
                        </h1>
                    </div>
                    {/* AUDIENCE */}
                    <div>
                        <label
                            htmlFor="audience"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Audience
                        </label>
                        <h1 name="audience" id="audience">
                            {audience}
                        </h1>
                    </div>
                    {/* UNKNOWN */}
                    <div>
                        <label
                            htmlFor="unknown"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Unknown
                        </label>
                        <h1 name="unknown" id="unknown">
                            {unknown}
                        </h1>
                    </div>
                    {/* BEHAVIOR */}
                    <div>
                        <label
                            htmlFor="behavior"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Behavior
                        </label>
                        <h1 name="behavior" id="behavior">
                            {behavior}
                        </h1>
                    </div>
                    {/* Existing URL List */}
                    <div>
                        <label
                            htmlFor="url-list"
                            className={`${
                                existingURLList.length !== 0
                                    ? "block"
                                    : "hidden"
                            } text-gray-700 font-bold mb-2`}
                        >
                            Existing URL List
                        </label>
                        <div
                            className={`${
                                existingURLList.length !== 0 ? "flex" : "hidden"
                            } flex-col gap-2 mb-4 max-h-[10rem] overflow-y-auto`}
                            id="url-list"
                            name="url-list"
                        >
                            {existingURLList.map((url, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 rounded-full px-4 py-2"
                                >
                                    {url}
                                </div>
                            ))}
                        </div>
                    </div>
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

export default ViewDataForm;
