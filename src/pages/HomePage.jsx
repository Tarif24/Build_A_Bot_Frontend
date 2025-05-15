import Hero from "../components/Hero";
import Question from "../components/Question";

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-200">
            <Hero />
            <Question
                question="What is Build A Bot?"
                answer="The capital of France is Paris."
            />
            <Question
                question="What is RAG Bot?"
                answer="The capital of France is Paris."
            />
        </div>
    );
};

export default HomePage;
