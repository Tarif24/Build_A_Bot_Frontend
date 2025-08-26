import Hero from "../components/Hero";
import ChatTextDisplay from "../components/ChatTextDisplay";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    document.body.style.overflow = "auto";
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center bg-gray-200">
            <Hero />

            <div className="flex flex-col justify-center items-center gap-50 my-50">
                <ChatTextDisplay
                    flip={false}
                    question={"What is Build A Bot?"}
                    chatHistory={[
                        { role: "user", content: "What is Build A Bot?" },
                        {
                            role: "assistant",
                            content:
                                "Build A Bot empowers you to create fully customized, intelligent chat bots tailored to your specific domain or audience. Unlike generic AI assistants, Build A Bot leverages Retrieval Augmented Generation (RAG) technology allowing you to link external data sources such as Wikipedia pages and websites directly into your bot's knowledge base",
                        },
                        {
                            role: "assistant",
                            content:
                                "This means your bot doesn’t just rely on pre-trained knowledge it references your curated data to deliver accurate, context-aware responses. Whether you're building a support assistant for your product, an educational tutor for a niche topic, or an internal tool for company knowledge, Build A Bot gives you the tools to design a chatbot that speaks your language and understands your content",
                        },
                        {
                            role: "assistant",
                            content:
                                "Craft smart, topic-specific bots that are not only conversational, but also deeply informed by the information you provide",
                        },
                    ]}
                />

                <ChatTextDisplay
                    flip={true}
                    question={"What Is A RAG Chat Bot?"}
                    chatHistory={[
                        { role: "user", content: "What is a RAG chat bot?" },
                        {
                            role: "assistant",
                            content:
                                "A RAG bot is a chatbot that uses the Retrieval-Augmented Generation (RAG) technique. RAG combines two main components retrieval and generation",
                        },
                        {
                            role: "assistant",
                            content:
                                "For the retrieval the bot searches a database or set of documents to find relevant information based on the user's question",
                        },
                        {
                            role: "assistant",
                            content:
                                "For the generation component it uses a language model (like GPT) to generate a natural language response, using both the retrieved information and its own knowledge",
                        },
                        {
                            role: "assistant",
                            content:
                                "This approach allows the bot to provide more accurate, up-to-date, and contextually relevant answers, especially when the information is not part of the model’s original training data",
                        },
                    ]}
                />

                <ChatTextDisplay
                    flip={false}
                    question={"How To Build A Bot?"}
                    chatHistory={[
                        { role: "user", content: "How do i Build A Bot?" },
                        {
                            role: "assistant",
                            content:
                                "Step 1: Go to the date page on the navbar",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 2: Select Create Collection for the Action Type",
                        },
                        {
                            role: "assistant",
                            content: "Step 3: Fill out the entire form",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 3.1: Links and PDFs for the data can be given now or later in the Add Data Action Type",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 3.2: The links and PDFs given will be scrapped and used as the context so please include relevant links to your specialization",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 4: After the collection has been created and all your data has been added, go to the Chat Bot page on the navbar",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 5: Select the collection you want to use for the bot",
                        },
                        {
                            role: "assistant",
                            content:
                                "Step 6: Now you can ask the bot any question related to the data in the collection",
                        },
                    ]}
                />

                <ChatTextDisplay
                    flip={true}
                    question={"What To Do Next?"}
                    chatHistory={[
                        { role: "user", content: "What should I do next?" },
                        {
                            role: "assistant",
                            content:
                                "Now that you have created a bot, here are some things that you can do:",
                        },
                        {
                            role: "assistant",
                            content:
                                "Add Data to your collection by going to the Data page and selection Add Data",
                        },
                        {
                            role: "assistant",
                            content:
                                "Edit collection by going to the Data page and selecting Edit Collection",
                        },
                        {
                            role: "assistant",
                            content:
                                "View the custom behavior of your bot by going to the Data page and selecting View Data",
                        },
                        {
                            role: "assistant",
                            content:
                                "Delete collection by going to the Data page and selecting Delete Collection",
                        },
                        {
                            role: "assistant",
                            content:
                                "Create a whole new RAG Bot by going to the Data page and selecting Create Collection",
                        },
                    ]}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer hover:scale-125 text-4xl text-white font-bold py-4 px-6 rounded-full mb-10 transition duration-300"
                onClick={() => navigate("/data")}
            >
                Wanna Build A Bot
            </button>
        </div>
    );
};

export default HomePage;
