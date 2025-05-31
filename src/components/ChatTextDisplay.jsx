const ChatTextDisplay = ({ question, chatHistory = [], flip = false }) => {
    return (
        <div
            className={`flex ${
                flip ? "flex-col sm:flex-row-reverse" : "flex-col sm:flex-row"
            } gap-12 justify-center w-full items-center min-h-fit bg-gray-200 sm:px-10`}
        >
            <h1 className="sm:flex-1/3 text-4xl sm:text-6xl font-semibold text-center min-h-fit">
                {question}
            </h1>
            <div className="sm:flex-2/3 flex flex-col border-2 rounded-2xl bg-white w-[95%]">
                <div className="flex flex-col overflow-y-auto px-2 sm:px-10 h-fit max-h-fit">
                    {chatHistory.map(({ role, content }, index) => (
                        <div
                            className={`w-fit max-w-[70%] sm:max-w-[60%] mt-2 sm:mt-4 p-4 break-words ${
                                role === "user"
                                    ? "self-end rounded-l-2xl rounded-tr-2xl bg-blue-500 text-white"
                                    : "self-start rounded-r-2xl rounded-tl-2xl bg-gray-200 text-black"
                            }`}
                            key={index}
                        >
                            <h1 className="text-[0.8rem] sm:text-[1.2rem]">
                                {content}
                            </h1>
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
