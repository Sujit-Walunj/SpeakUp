import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineUpload } from "react-icons/ai";
import { FaPaperclip } from "react-icons/fa"; // Icon for file upload
import { postComplaint, getComplaints } from '../../../../Services/Operations/complaintAPI';

const ComplaintUpload = ({ groupId, setComplaints,classes}) => {
    const textareaRef = useRef(null);
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);

    const { token } = useSelector(state => state.auth);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        adjustHeight();
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setAttachment(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            alert("Please provide a description for the complaint.");
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            setLoading(true);
            await postComplaint(formData, token, groupId);
            const updatedComplaints = await getComplaints(groupId, token);
            setComplaints(updatedComplaints);
            setDescription('');
            setAttachment(null);
        } catch (error) {
            console.error('Error uploading complaint:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className= "rounded-md mb-6 flex" >
            <form onSubmit={handleSubmit} className="flex w-full pt-2 relative">
                <div className="flex-shrink-0 absolute bottom-0 px-2">
                    <label htmlFor="attachment" className="cursor-pointer p-2 text-blue-600 hover:text-blue-800 transition">
                        <FaPaperclip size={24} />  {/* Display Paperclip Icon */}
                    </label>
                    <input
                        type="file"
                        id="attachment"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,video/*"
                    />
                </div>

                <div className="flex-1 mb-2 w-[80%] mx-10   ">
                    <textarea
                        ref={textareaRef}
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Type a message..."
                        rows={1}
                        required
                        className="w-full flex-1 p-2 rounded-lg border border-gray-300 bg-blue-200
                        focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto no-scrollbar"
                        style={{ height: 'auto', maxHeight: '150px' }} // Adjust maxHeight as needed
                    />
                </div>

                <div className="flex-shrink-0 absolute bottom-0 p-2 right-0">
                    <button type="submit" className="text-blue-600 hover:text-blue-800 transition" disabled={loading}>
                        <AiOutlineUpload size={24} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ComplaintUpload;
