import Hero from "../components/Hero";
import Question from "../components/Question";
import HowToSteps from "../components/HowToSteps";

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
            <HowToSteps
                listOfSteps={[
                    "Step 1: Choose a template",
                    "Step 2: Customize your bot",
                    "Step 3: Deploy your bot",
                    "Step 4: Monitor and improve",
                ]}
            />
        </div>
    );
};

export default HomePage;
