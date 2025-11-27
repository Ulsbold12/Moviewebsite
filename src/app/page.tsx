"use client";

import { HomeScreen } from "./_components/HomeScreen";
import { HomeScreenEnd } from "./_components/HomeScreenEnd";
import { MovieSection } from "./_components/Movie";
import { MovieListPopular } from "./_components/MovieListpopular";
import { categories } from "./_constants";
import { useState } from "react";

const Homepage = () => {
  return (
    <>
      <HomeScreen />
      {categories.map((el) => (
        <MovieSection
          key={el.categoryName}
          categoryPath={el.categoryPath}
          categoryName={el.categoryName}
        />
      ))}

      <HomeScreenEnd />
    </>
  );
};

export default Homepage;
