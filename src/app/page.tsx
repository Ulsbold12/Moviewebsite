"use client";

import { HomeScreen } from "./_components/HomeScreen";
import { HomeScreenEnd } from "./_components/HomeScreenEnd";
import { MovieSection } from "./_components/Movie";
import { categories } from "./_constants";

const Homepage = () => {
  return (
    <>
      <HomeScreen />
      {categories.map((el) => (
        <MovieSection
          key={el.categoryName}
          categoryPath={el.categoryPath}
          categoryName={el.categoryName}
          limit={10}
          currentPage={1}
        />
      ))}

      <HomeScreenEnd />
    </>
  );
};

export default Homepage;
