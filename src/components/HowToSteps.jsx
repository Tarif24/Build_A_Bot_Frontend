import React from "react";

const HowToSteps = ({ listOfSteps }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-[90vh] min-h-fit bg-gray-200">
            <div className="flex flex-col justify-center gap-12 items-center w-[80%] min-h-fit">
                <h1 className="text-6xl font-semibold text-left w-full">
                    How To Steps
                </h1>
                {listOfSteps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-center items-center w-full min-h-fit bg-gray-200"
                    >
                        <h1 className="text-2xl text-left w-full">{step}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowToSteps;
