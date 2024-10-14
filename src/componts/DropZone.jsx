import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

const Dropzone = ({ onFileChange }) => {
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState('');

    const handleFileChange = useCallback((event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name); // Update state with the file name

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Update preview state
                onFileChange(file); // Call parent function with the file
            };
            reader.readAsDataURL(file);
        }
    }, [onFileChange]);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name); // Update state with the file name

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Update preview state
                onFileChange(file); // Call parent function with the file
            };
            reader.readAsDataURL(file);
        }
    }, [onFileChange]);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className='flex flex-col lg:flex-row gap-4 w-full pb-6'>
            <div className={preview ? "flex flex-col items-center justify-center w-1/2" : "flex flex-col items-center justify-center w-full"}>
                <label
                    htmlFor="dropzone-file"
                    className={!preview ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" : "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

            </div>
            {preview && (
                <div className="mt-0 w-1/2">
                    <img src={preview} alt="Preview" className="w-full mt-12 h-64 rounded-lg" />
                    {fileName && (
                        <div className="mt-4 text-xs mx-auto text-gray-700 ">
                            Selected file: <span className="font-semibold">{fileName}</span>
                        </div>
                    )}
                </div>

            )}

        </div>
    );
};

export default Dropzone;


Dropzone.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};