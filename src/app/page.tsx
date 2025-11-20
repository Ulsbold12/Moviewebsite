import { HomeScreen } from "./_components/HomeScreen";
import { HomeScreenEnd } from "./_components/HomeScreenEnd";
import { MovieSection } from "./_components/Movie";
import { MovieListPopular } from "./_components/MovieListpopular";

const Homepage = () => {
  return (
    <>
      <HomeScreen />
      <MovieSection categoryPath="upcoming" categoryName="Upcoming" />
      <MovieSection categoryPath="popular" categoryName="Popular" />
      <MovieSection categoryPath="top_rated" categoryName="Top Rated" />
      <HomeScreenEnd />
    </>
  );
};

export default Homepage;
