import { useState, useRef, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";

const ChatBotPage = () => {
    const API_URL = import.meta.env.VITE_RAG_CHAT_API_URL;

    // State to hold the selected collection name
    const [name, setName] = useState("");

    // State to hold the input text and typing status
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // State to hold the chat history
    const [chatHistory, setChatHistory] = useState([]);

    // State to hold the list of collection names
    const [RAGList, setRAGList] = useState([]);

    // Reference to the end of the chat history for scrolling
    const chatEndRef = useRef(null);

    // Fetch all collection names from the database
    useEffect(() => {
        fetch(`${API_URL}/getAllRAGBotCollectionsByName`)
            .then((response) => response.json())
            .then((data) => {
                setRAGList(data);
            });
    }, []);

    // Submit form handler
    const submitForm = async (e) => {
        e.preventDefault();

        if (inputText.trim() === "") return;
        if (name === "") {
            alert("Please select a collection name.");
            return;
        }

        setInputText((prev) => prev.trim());

        setChatHistory((prev) => [
            ...prev,
            { role: "user", content: `${inputText}` },
        ]);

        try {
            setIsTyping(true);
            const responseJSON = await fetch(`${API_URL}/query`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: inputText,
                    collectionName: name,
                }),
            });

            const response = await responseJSON.json();

            setChatHistory((prev) => [
                ...prev,
                { role: "assistant", content: response.message },
            ]);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsTyping(false);
        }

        setInputText("");
    };

    const collectionSwitchHandler = async (e) => {
        setName(e.target.value);
        await fetch(`${API_URL}/resetChatHistory`);
        setChatHistory([]);
    };

    // Scroll to the bottom of the chat history when a new message is added
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    return (
        <>
            <div className="flex flex-col items-center gap-4 bg-gray-200 w-full h-[90vh] pb-2 sm:pb-0 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-fit pt-2 sm:pt-0 sm:pb-4">
                    <h1 className="text-gray-700 font-bold text-2xl">
                        Collection Name
                    </h1>
                    <select
                        className="border rounded flex-1 py-2 px-3 bg-white"
                        required
                        value={name}
                        onChange={(e) => collectionSwitchHandler(e)}
                    >
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
                <div className="flex flex-col justify-end border-2 sm:border-3 rounded-2xl w-[95%] sm:w-[90%] h-[90%] max-h-[90%] bg-white sm:mb-4">
                    <div className="flex flex-grow flex-col overflow-y-auto px-2 sm:px-10 h-fit max-h-fit">
                        {chatHistory.map(({ role, content }, index) => (
                            <div
                                className={`w-fit max-w-[70%] sm:max-w-[60%] mt-2 sm:mt-4 p-3 sm:p-4 break-words ${
                                    role === "user"
                                        ? "self-end rounded-l-2xl rounded-tr-2xl bg-blue-500 text-white"
                                        : "self-start rounded-r-2xl rounded-tl-2xl bg-gray-200 text-black"
                                }`}
                                key={index}
                            >
                                <h1 className="text-[0.8rem] sm:text-[1.2rem]">
                                    {role === "assistant" ? (
                                        <TypeAnimation
                                            sequence={[content]}
                                            speed={120}
                                            cursor={false}
                                            className=""
                                        />
                                    ) : (
                                        content
                                    )}
                                </h1>
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                        <PulseLoader
                            color="#000000"
                            loading={isTyping}
                            size={12}
                            speedMultiplier={1}
                        />
                    </div>
                    <form
                        className="flex justify-center items-end h-fit"
                        onSubmit={submitForm}
                    >
                        <div className="relative h-[3rem] w-full border-2 border-black rounded-[5rem] m-2 sm:m-4">
                            <input
                                type="text"
                                placeholder="What do you want to know..."
                                className="relative h-full px-5 w-full focus:outline-none rounded-[5rem]"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button
                                className="absolute right-0 top-0 h-full bg-blue-500 text-white rounded-[5rem] px-4 py-2 hover:cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
                                type="submit"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatBotPage;
