import { ArrowLeftIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ loading, setLoading ] = useState(false);  
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !title.trim() || !content.trim() ) {
     toast.error("Please fill in all fields");
     return;
    }

    setLoading(true);
    try {
      await api.post('/notes', {
        title,
        content
      });
      toast.success("Note created successfully");
      navigate('/');
    } catch (error) {
      console.error("Error creating note:", error);

      if(error.response.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.", {
          duration: 3000,
          icon: '🚨',
        });
      }else {
        toast.error("Failed to create note!");
      }
    } finally {
      setLoading(false);
    }
  }


  return <div className="min-h-screen bg-base-200"> 
    <div className="container mx-auto px-4 py-8 ">
      <div className="max-w-2xl mx-auto border-t-4 border-solid border-[#3D43F3] pt-5 r">
        <Link to='/' className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5' />
          Bask to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body border-t-4 border-b-4 border-solid border-[#3D43F3]'>
            <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control'>
                <span className='label-text pb-3'>Title</span>
                <input 
                  type='text' 
                  placeholder='Enter Note Title' 
                  className='input input-bordered'
                  value={ title }
                  onChange={ e => setTitle( e.target.value ) }>
                </input>
              </div>

              <div className='form-control'>
                <span className='label-text pt-5 pb-3'>Note Content</span>
                <textarea 
                  type='text' 
                  placeholder='Enter Note Content' 
                  className='textarea textarea-bordered h-40 '
                  value={ content }
                  onChange={ e => setContent( e.target.value )}>
                </textarea>
              </div>

              <div className='card-actions justify-end mt-5'>
                <button 
                  type='submit' 
                  className='btn bg-[#2b2fbc] px-10 hover:bg-[#5a60ff]' 
                  disabled={ loading } 
                >
                  { loading ? "Cerating Note..." : "Create Note" }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  </div>

}

export default CreatePage
