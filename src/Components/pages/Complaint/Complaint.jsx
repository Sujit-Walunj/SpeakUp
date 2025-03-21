import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { postComplaint } from "../../../Services/Operations/complaintAPI";
import { CiMail } from "react-icons/ci";
import { IoCaretUpCircleSharp, IoCaretDownCircle } from "react-icons/io5";
import { AiOutlineUpload } from "react-icons/ai";
import { FaPaperclip } from "react-icons/fa"; // Icon for file upload
import { resolveComplaint, getComplaints } from '../../../Services/Operations/complaintAPI';
import check from "../../../data/check-mark.png";
import { IoMdMore } from "react-icons/io";
import useOnClickOutside from '../../../Hook/useONClickOutside';
export const Complaint = () => {
    const textareaRef = useRef(null);
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);

    const { token } = useSelector(state => state.auth);
    const group = useSelector((state) => state.viewGroup.group);
    const { groupId } = useParams();
    const { user } = useSelector((state) => state.profile);

    const [complaints, setComplaints] = useState([]);

    const userId = user._id;
    const currentGroup = group.find((g) => g._id === groupId);

    const [modal, setmodal] = useState(false);

    useEffect(() => {
        const fetchGroupComplaints = async () => {
            try {
                const fetchedComplaints = await getComplaints(groupId, token);
                setComplaints(fetchedComplaints);
            } catch (error) {
                console.error('Failed to fetch complaints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupComplaints();
    }, [groupId, token]);

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
        if (attachment) formData.append('attachment', attachment);

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

    const handleCheckboxChange = async (complaintId) => {
        try {
            await resolveComplaint(token, complaintId, groupId);
            const updatedComplaints = await getComplaints(groupId, token);
            setComplaints(updatedComplaints);
        } catch (err) {
            console.error('Failed to resolve complaint:', err);
        }
    };

    const handleVote = async (complaintId) => {
        try {
            await Vote(token, complaintId, groupId);
            const updatedComplaints = await getComplaints(groupId, token);
            setComplaints(updatedComplaints);
        } catch (err) {
            console.error('Failed to vote:', err);
        }
    };

    const handleModal = () => {

        return setmodal(!modal);
    }



    //--------------------------------------------
        const ref = useRef(null);
        useOnClickOutside(ref, () => setmodal(false))
        //--------------------------------------------


















        if (!currentGroup) return <div>Group not found</div>;

        return (
            <div className=' w-full h-[calc(100vh-5.9rem)] relative '>

                <div className="flex-1 p-4 h-[80%]">
                    <div className="bg-white shadow-md rounded-md pl-2 pr-2 mb-2 flex justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold  text-indigo-600">
                                {currentGroup.groupName}
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base mb-2">{currentGroup.groupDescription}</p>
                        </div>

                        <div className='relative'>
                            <IoMdMore onClick={() => handleModal()} className=' relative cursor-pointer' />
                               {modal &&  <>
                               
                               <div ref={ref} className="absolute right-0 bg-white border mt-2 p-4 rounded shadow-lg">
                                   <ul>
                                       <li>About</li>
                                       <li>Leave</li>
                                       <li>Report</li>
                                   </ul>
                               </div>
                           </>}
                           
                        </div>

                    </div>




                    {complaints.length > 0 ? (
                        <div className="space-y-4 h-full
                    overflow-auto  rounded-lg p-2">
                            {complaints.map((complaint) => (
                                <div
                                    key={complaint._id}
                                    className={`${complaint.publisher._id === userId ? "flex justify-end" : "flex justify-start"}`}
                                >
                                    <div className='shadow-inner shadow-slate-100 rounded-md p-4 w-full sm:w-[80%] '>
                                        {complaint.publisher._id !== userId && (
                                            <a href={`mailto:${complaint.publisher.email}`} className="flex items-center gap-2 text-gray-500 text-sm">
                                                <CiMail />
                                                {complaint.publisher.email}
                                            </a>
                                        )}
                                        <p className="text-gray-900 text-sm mt-2">{complaint.description}</p>
                                        {complaint.attachment && (
                                            <div className="mt-2">
                                                <img src={complaint.attachment} alt="attachment" className="max-w-[200px] h-auto" />
                                                <a href={complaint.attachment} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
                                                    View Attachment
                                                </a>
                                            </div>
                                        )}
                                        <div className='flex justify-between items-center mt-4'>
                                            {currentGroup.Admin !== userId && (
                                                <div className='flex items-center gap-2'>
                                                    <IoCaretUpCircleSharp
                                                        className={`hover:scale-110 cursor-pointer ${complaint.vote === 0 ? "" : "hidden"}`}
                                                        onClick={() => handleVote(complaint._id)}
                                                    />
                                                    <IoCaretDownCircle
                                                        className={`hover:scale-110 cursor-pointer ${complaint.vote === 1 ? "" : "hidden"}`}
                                                        onClick={() => handleVote(complaint._id)}
                                                    />
                                                    <span className="text-gray-700">{complaint.vote}</span>
                                                </div>
                                            )}
                                            {currentGroup.Admin === userId && (
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(complaint._id)}
                                                        checked={complaint.status}
                                                        className="hidden"
                                                    />
                                                    <img
                                                        src={check}
                                                        alt="Checkmark"
                                                        className={`${complaint.status ? 'block' : 'hidden'} w-5 h-5 pointer-events-none`}
                                                    />
                                                    <span className={`text-sm font-semibold ${complaint.status ? "text-gray-500" : "text-blue-500"}`}>
                                                        {complaint.status ? 'Resolved' : 'Resolve'}
                                                    </span>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-200 text-center text-gray-600 p-10 rounded-lg">
                            No complaints available.
                        </div>
                    )}


                </div>


                <div className="rounded-md mb-6 flex w-full mt-4 absolute bottom-0">
                    <form onSubmit={handleSubmit} className="flex w-full p-2 bg-gray-100 rounded-md relative">
                        <div className="flex-shrink-0">
                            <label htmlFor="attachment" className="cursor-pointer text-blue-500
        absolute bottom-5 
        ">
                                <FaPaperclip size={24} />
                            </label>
                            <input
                                type="file"
                                id="attachment"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,video/*"
                            />
                        </div>

                        <div className="flex-1 ml-8 mr-5">
                            <textarea
                                ref={textareaRef}
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Type a message..."
                                rows={1}
                                required
                                className="w-full p-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto"
                                style={{ height: 'auto', maxHeight: '150px' }}
                            />
                        </div>

                        <div className="flex-shrink-0">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    
};
