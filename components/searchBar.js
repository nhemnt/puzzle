import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Search = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 opacity-30"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data) => router.push(`/${data.platform}/${data.q}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex bg-white px-5 lg:px-7 py-3 rounded-full">
        <input
          type="text"
          placeholder="Search for free photos..."
          {...register("q", { required: true })}
          className="outline-none"
        />
        <select {...register("platform")} className="outline-none w-20 ml-2">
          <option value="" disabled>
            Choose a Platform
          </option>
          <option value="all">All</option>
          <option value="pexels">Pexels</option>
          <option value="pixabay">Pixabay</option>
        </select>
        <button type="submit" className="ml-2">
          <Search />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
