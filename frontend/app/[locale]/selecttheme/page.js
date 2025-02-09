"use client";
import React, { useEffect, useState } from "react";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
import Footer from "../components/Footers/Footer";
import { useGetWebBuildersQuery } from "@/lib/features/webBuilder/webBuilder";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";
import { useGetTemplatebyTypeQuery } from "@/lib/features/webBuilder/webBuilder";

const  SelectTheme = ({ searchQuery, filters })=> {
  const { data, error, isLoading } = useGetWebBuildersQuery();
  useCheckUnauthorized(error);

  const [filteredData, setFilteredData] = useState([]);

  const filterThemes = (data, searchQuery, filters) => {
    return data.filter((theme) => {
      const matchesSearchQuery = searchQuery
        ? theme.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesFilter =
        (filters?.free && theme.template_type === "free") ||
        (filters?.premium && theme.template_type === "premium") ||
        (!filters?.free && !filters?.premium);

      return matchesSearchQuery && matchesFilter;
    });
  };

  useEffect(() => {
    if (data) {
      setFilteredData(filterThemes(data, searchQuery, filters));
    }
  }, [data, searchQuery, filters]);

  // Debugging to ensure data is received and filters are applied
  useEffect(() => {
    console.log("Data:", data);
    console.log("Search Query:", searchQuery);
    console.log("Filters:", filters);
    console.log("Filtered Data:", filteredData);
  }, [data, searchQuery, filters, filteredData]);

  return (
    <div className="mt-24">
      <SelectedTheme />
      <div className="flex flex-col m-8 mb-24">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="font-bold">Popular themes</h2>
          <p>Made with core features you can easily customize -- no coding needed</p>
        </div>
        <div className="flex w-full h-full gap-6 flex-wrap justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((theme) => <Theme key={theme.id} theme={theme} />)
          ) : (
            <p className="text-white">No themes found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectTheme;
