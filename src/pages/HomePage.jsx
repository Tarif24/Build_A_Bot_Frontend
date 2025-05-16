import Hero from "../components/Hero";
import Question from "../components/Question";
import HowToSteps from "../components/HowToSteps";

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-200">
            <Hero />

            <Question
                question="What Is Build A Bot?"
                answers={[
                    "Build A Bot empowers you to create fully customized, intelligent chat bots tailored to your specific domain or audience. Unlike generic AI assistants, Build A Bot leverages Retrieval Augmented Generation (RAG) technology allowing you to link external data sources such as Wikipedia pages and websites directly into your bot's knowledge base.",
                    "This means your bot doesn’t just rely on pre-trained knowledge it references your curated data to deliver accurate, context-aware responses. Whether you're building a support assistant for your product, an educational tutor for a niche topic, or an internal tool for company knowledge, Build A Bot gives you the tools to design a chatbot that speaks your language and understands your content.",
                    "Craft smart, topic-specific bots that are not only conversational, but also deeply informed by the information you provide.",
                ]}
            />

            <Question
                question="What Is A RAG Chat Bot?"
                answers={[
                    "A RAG bot is a chatbot that uses the Retrieval-Augmented Generation (RAG) technique. RAG combines two main components retrieval and generation. For the retrieval the bot searches a database or set of documents to find relevant information based on the user's question. while for the generation component it uses a language model (like GPT) to generate a natural language response, using both the retrieved information and its own knowledge. This approach allows the bot to provide more accurate, up-to-date, and contextually relevant answers, especially when the information is not part of the model’s original training data.",
                ]}
            />

            <HowToSteps
                listOfSteps={[
                    "Step 1: Go to the date page on the navbar",
                    "Step 2: Select Create Collection for the Action Type",
                    "Step 3: Fill out the entire form",
                    "Step 3.1: Links for the data can be given now or later in the Add Data Action Type",
                    "Step 3.2: The links given will be scrapped and used as the context so please include relevant links to your specialization",
                    "Step 4: After the collection has been created and all your data has been added, go to the Chat Bot page on the navbar",
                    "Step 5: Select the collection you want to use for the bot",
                    "Step 6: Now you can ask the bot any question related to the data in the collection",
                ]}
            />

            <HowToSteps
                title="What To Do Next?"
                description="Now that you have created a bot, here are some things that you can do:"
                listOfSteps={[
                    "- Add Data to your collection by going to the Data page and selection Add Data",
                    "- Edit collection by going to the Data page and selecting Edit Collection",
                    "- View the custom behavior of your bot by going to the Data page and selecting View Data",
                    "- Delete collection by going to the Data page and selecting Delete Collection",
                    "- Create a whole new RAG Bot by going to the Data page and selecting Create Collection",
                ]}
            />
        </div>
    );
};

export default HomePage;
