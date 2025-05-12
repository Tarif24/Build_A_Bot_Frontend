import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const EditCollectionForm = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [tone, setTone] = useState("");
    const [audience, setAudience] = useState("");
    const [unknown, setUnknown] = useState("");
    const [behavior, setBehavior] = useState("");

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

        const RAGBot = {
            collectionName: name,
            specialization: specialization,
            tone: tone,
            audience: audience,
            unknown: unknown,
            behavior: behavior,
        };

        const responseJSON = await fetch(`${API_URL}/editRAGBot`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RAGBot),
        });

        const response = await responseJSON.json();

        toast.success(`Edited RAG Bot ${name} Successfully`);

        setIsLoading(false);
    };

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

        const response = await responseJSON.json().message;

        setSpecialization(response.specialization);
        setTone(response.tone);
        setAudience(response.audience);
        setUnknown(response.unknown);
        setBehavior(response.behavior);
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Edit Collection
                        </button>
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

export default EditCollectionForm;
