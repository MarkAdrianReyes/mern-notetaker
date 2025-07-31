import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return <header className=" bg-[#1d1d1d] boaader-b border-base-content/10 ">
    <div className=" mx-auto max-w-6xl px-4 py-6 ">
      <div className=" flex items-center justify-between ">
        <h1 className=" text-4xl font-bold text-[#585efc] font-mono traracking-tighter ">
          NoteTaker
        </h1>

        <div className=" fl items-center gap-4 ">
          <Link to={"/create"} className=" btn bg-[#585efc]">
            <PlusIcon className='size-5 text-[#000000]'/>
            <span className='text-[#000000]'>New Note</span>
          </Link>
        </div>

      </div>
    </div>
  </header>;
};

export default Navbar;
