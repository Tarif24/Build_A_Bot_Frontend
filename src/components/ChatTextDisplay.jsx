const ChatTextDisplay = ({ question, chatHistory = [] }) => {
    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-fit bg-gray-200">
            <h1 className="text-6xl font-semibold text-left w-[90%] min-h-fit">
                {question}
            </h1>
            <div className="flex flex-col border-3 rounded-2xl w-[90%] bg-white">
                <div className="flex flex-grow flex-col overflow-y-auto mx-2 px-10 h-fit max-h-fit">
                    {chatHistory.map(({ role, content }, index) => (
                        <div
                            className={`w-fit max-w-[60%] mt-4 p-4 break-words ${
                                role === "user"
                                    ? "self-end rounded-l-2xl rounded-tr-2xl bg-blue-500 text-white"
                                    : "self-start rounded-r-2xl rounded-tl-2xl bg-gray-200 text-black"
                            }`}
                            key={index}
                        >
                            <h1 className="text-2xl">{content}</h1>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-end h-fit">
                    <div className="relative h-[3rem] w-full border-2 border-black rounded-[5rem] m-4">
                        <div className="relative flex items-center h-full px-5 w-full focus:outline-none rounded-[5rem]">
                            <h1 className="text-[#7a7e87]">
                                What do you want to know...
                            </h1>
                        </div>
                        <button className="absolute right-0 top-0 h-full bg-blue-500 text-white rounded-[5rem] px-4 py-2 hover:cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatTextDisplay;
