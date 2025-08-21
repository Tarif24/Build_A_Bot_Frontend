import React, { useState, useRef, useEffect } from "react";
import { LuUpload } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function PDFInput({ onPDFInputChange }) {
    const [previewFile, setPreviewFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragCounter, setDragCounter] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const dropZoneRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        onPDFInputChange(selectedFiles);
    }, [selectedFiles]);

    const handleFileChange = (filesList) => {
        const files = Array.from(filesList);
        const pdfFiles = files.filter(
            (file) => file.type === "application/pdf"
        );

        if (pdfFiles.length !== files.length) {
            alert("Please select only PDF files");
            return;
        }

        const filesWithPreviews = pdfFiles.map((file) => ({
            file,
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            previewUrl: URL.createObjectURL(file),
        }));

        setSelectedFiles((prev) => [...prev, ...filesWithPreviews]);
    };

    const removeFile = (fileId) => {
        setSelectedFiles((prev) => {
            const updated = prev.filter((f) => f.id !== fileId);
            // Clean up preview URL
            const fileToRemove = prev.find((f) => f.id === fileId);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.previewUrl);
            }

            return updated;
        });
    };

    const handlePreview = (fileData) => {
        setPreviewFile(fileData);
    };

    const closePreview = () => {
        setPreviewFile(null);
    };

    // Drag event handlers
    // prevent default behavior for all the drag events because they block drag by default
    // stopPropagation to prevent the event from bubbling up
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => prev + 1);

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter((prev) => {
            const newCount = prev - 1;

            if (newCount === 0) {
                setIsDragOver(false);
            }

            return newCount;
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragOver(false);
        setDragCounter(0);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    // Open file dialog when the drop zone is clicked since the input is hidden
    const openFileDialog = (e) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    if (previewFile) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div>
            {/* PDF UPLOAD */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                    Select PDF Files
                </label>

                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="hidden"
                    />

                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 hover:cursor-pointer transition-colors ${
                            isDragOver ? `border-blue-500` : `border-gray-300`
                        }`}
                        ref={dropZoneRef}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                    >
                        <label className="cursor-pointer flex flex-col items-center gap-4">
                            <LuUpload size="3rem" color="gray" />
                            <p className="text-gray-600">
                                Click to select PDF files or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                                Multiple files supported
                            </p>
                        </label>
                    </div>
                </div>
            </div>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Selected Files ({selectedFiles.length})
                    </h3>
                    <div className="space-y-2">
                        {selectedFiles.map((fileData) => (
                            <div
                                key={fileData.id}
                                className="flex items-center justify-between p-3 border rounded-lg border-gray-400 bg-gray-200"
                            >
                                <div className="flex items-center space-x-3 text-red-400">
                                    <CiFileOn size="1rem" />
                                    <div>
                                        <p className="font-medium text-gray-600">
                                            {fileData.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePreview(fileData)}
                                        className="p-2 text-blue-400 hover:bg-blue-100 rounded-full transition-colors hover:cursor-pointer"
                                        title="Preview"
                                        type="button"
                                    >
                                        <IoEyeOutline size="1rem" />
                                    </button>
                                    <button
                                        onClick={() => removeFile(fileData.id)}
                                        className="p-2 text-red-400 hover:bg-red-100 rounded-full transition-colors hover:cursor-pointer"
                                        title="Remove"
                                        type="button"
                                    >
                                        <IoMdClose size="1rem" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PDF Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-gray-400">
                            <h3 className="text-lg font-medium">
                                {previewFile.name}
                            </h3>
                            <button
                                onClick={closePreview}
                                className="p-2 hover:bg-gray-100 hover:cursor-pointer rounded-full transition-colors"
                            >
                                <IoMdClose size="1rem" />
                            </button>
                        </div>
                        <div className="p-4">
                            <iframe
                                src={previewFile.previewUrl}
                                className="w-full h-[70vh] border rounded border-gray-400"
                                title={`Preview of ${previewFile.name}`}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
