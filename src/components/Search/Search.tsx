'use client';
import { useRouter } from "next/navigation";
import {  ChangeEvent, FC } from "react";
type Props = {
    roomTypeFilter: string;
    searchQuery: string;
    setRoomTypeFilter: (value: string) => void;
    setSearchQuery: (value: string) => void;
  };
  
  const Search: FC<Props> = ({
    roomTypeFilter,
    searchQuery,
    setRoomTypeFilter,
    setSearchQuery,
  }) => {
    const router = useRouter();
  
    const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setRoomTypeFilter(event.target.value);
    };
  
    const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleFilterClick = () => {
      router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
    };

    return (
        <section className="bg-tertiary-light px-4 py-6 rounded-lg">
            <div className="container mx-auto flex gap4 flex-wrap justify-between items-center">
                <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                    <label className="block text-sm font-medium mb-2 text-[#0B132B]">
                        Tipo de Hospedaje
                    </label>
                    <div className="relative">
                        <select 
                        value= {roomTypeFilter} 
                        onChange={handleRoomTypeChange} 
                        className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-[#0B132B] focus:outline-none">
                            <option value="All">Todos</option>
                            <option value="Basic">Habitación</option>
                            <option value="Luxury">Cabaña</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>
                </div>

                <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                    <label className="block text-sm font-medium mb-2 text-[#0B132B]">
                        Buscar
                    </label>
                    <input 
                    type="search" 
                    id="search" 
                    placeholder="Search..." 
                    className="w-full px-4 py-3 rounded leading-tight dark:bg-[#0B132B] focus:outline-none placeholder:text-black dark:placeholder:text-white" 
                    value={searchQuery} 
                    onChange={handleSearchQueryChange}
                    />
                </div>
                <button 
                className="btn-primary"
                type="button"
                 onClick={handleFilterClick}
                >
                    Buscar
                </button>
            </div>
        </section>
    );
};

export default Search;