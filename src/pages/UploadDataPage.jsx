import React, { useState } from "react";
import CreateCollectionForm from "../components/CreateCollectionForm";
import AddDataForm from "../components/AddDataForm";
import DeleteCollectionForm from "../components/DeleteCollectionForm";

const UploadDataPage = () => {
    const [type, setType] = useState("");

    return (
        <div className="flex flex-col justify-center items-center w-full h-[90vh]">
            <div className="w-full max-w-[40rem] bg-gray-100 rounded-4xl border-2 px-8 pt-6 pb-8 mb-4">
                <form>
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        {type === "" && "Upload Data"}
                        {type === "Create-Collection" && "Create Collection"}
                        {type === "Add-Data" && "Add Data"}
                        {type === "Delete-Collection" && "Delete Collection"}
                    </h1>
                    <div className="mb-4">
                        <label
                            htmlFor="type"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Action Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="" disabled>
                                Select an action type
                            </option>
                            <option value="Create-Collection">
                                Create Collection
                            </option>
                            <option value="Add-Data">Add Data</option>
                            <option value="Delete-Collection">
                                Delete Collection
                            </option>
                        </select>
                    </div>
                </form>
                {type === "Create-Collection" && <CreateCollectionForm />}
                {type === "Add-Data" && <AddDataForm />}
                {type === "Delete-Collection" && <DeleteCollectionForm />}
            </div>
        </div>
    );
};

export default UploadDataPage;
