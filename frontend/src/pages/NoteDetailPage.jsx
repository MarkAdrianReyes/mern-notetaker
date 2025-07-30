import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

import toast from "react-hot-toast";
import api from "../lib/axios";


const NoteDetailPage = () => {
  const [ note, setNote ]  = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ saving, setSaving ] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        toast.error("Failed to fetch note");
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();    
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Error deleting note:", error);
    }
  }
  
  const handleUpdate = async (e) => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Error updating note:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderIcon className="size-12 animate-spin text-[#3D43F3]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">

        <div className="max-w-2xl mx-auto border-t-4 border-solid border-[#3D43F3] pt-5">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Enter Note Content"
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className='card-actions flex items-center justify-between mt-5'>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="h-5 w-5" />
                  Delete Note
                </button>
                
                <button 
                  type='submit' 
                  className='btn bg-[#2b2fbc] px-10 hover:bg-[#5a60ff]' 
                  disabled={ saving }
                  onClick={handleUpdate}
                >
                  { saving ? "Updating Note..." : "Update Note" }
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default NoteDetailPage
