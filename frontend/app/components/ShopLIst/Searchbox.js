import React from "react";
import Dropdown from "./Dropdown";
const Searchbox = ({ shops }) => {
  return (
    <div>
      <div class="w-full ml-6 justify-center flex flex-1/2 gap-x-3">
        <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-lg border   border-[#78350F]   text-white transition duration-300 ease-in-out bg-[#78350F] hover:bg-[#FCD34D] hover:text-[#78350F]">
          <span className="rounded-none xl:text-2xl sm:text-xl font-medium">
            <Dropdown shops={shops} name="Catagories" />
          </span>
        </div>

        <input
          type="text"
          className="w-1/2 xl:w-1/3   md:px-3 md:py-1 md:text-xl  xl:text-xl placeholder-stone-300 focus:border-[#78350F] rounded-full focus:outline-none sm:py-1 sm:px-2 sm:text-sm xs:py-1"
          placeholder="Search for your favorite store..."
        />
      </div>
    </div>
  );
};

export default Searchbox;
