import React from "react";

const Question = ({ question, answers = [] }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh] min-h-fit bg-gray-200">
            <div className="flex flex-col justify-center gap-12 items-center w-[80%] min-h-fit">
                <h1 className="text-6xl font-semibold text-left w-full">
                    {question}
                </h1>
                <div className="flex flex-col w-full gap-4">
                    {answers.map((answer, index) => (
                        <h1 key={index} className="text-2xl text-left w-full">
                            {answer}
                        </h1>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Question;
