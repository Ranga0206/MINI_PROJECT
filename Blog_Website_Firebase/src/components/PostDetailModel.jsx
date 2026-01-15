import { Calendar, User, X } from 'lucide-react'
import React from 'react'
import Button from "../components/Button"

const PostDetailModel = ({ isOwner, onClose, onDelete, post }) => {
    const formatDate = (timestamp) => {
        if (!timestamp) return;
        return new Date(timestamp.seconds * 1000).toDateString("en-Us", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200'>
                <button onClick={onClose} className='absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors '>
                    <X size={24} />
                </button>
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-4 bg-linear-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent'>{post.title}</h2>
                    <div className='flex justify-between items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100 uppercase tracking-wide font-medium'>
                        <div className='flex items-center gap-2'>
                            <Calendar size={16} />
                            <span>{formatDate(post.created_At)}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <User size={16} />
                            <span>Author</span>
                        </div>

                    </div>
                    <div className='mb-8'>
                        <p className='text-lg text-slate-700 leading-relaxed whitespace-pre-wrap'>{post.description}</p>
                    </div>
                    {isOwner && (<div className='flex justify-end pt-6 border-t border-slate-100'>
                        <div className='w-full sm:w-auto'>
                            <Button onClick={() => onDelete(post.id)} text="Delete Post" type='danger' />
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default PostDetailModel