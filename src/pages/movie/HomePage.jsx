import { useDispatch, useSelector } from "react-redux";
import { getMovies, getMoviesFromStore} from "../../redux/movie/movieSlice";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import MovieListing from "../../components/MovieListing/MovieListing";
import { Spin } from "antd";

function HomePage() {
  const dispatch = useDispatch();
  const { movies } = useSelector(getMoviesFromStore);
  console.log("movies from store", movies);
  const fetchMovies = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      dispatch(getMovies(accessToken))
    }
  }

  useEffect(() => {
    fetchMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem(ACCESS_TOKEN)])

  return (
    <section>
      <h1 className="title">Movies</h1>
      {
        movies?.length === 0 ? 
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center'
          }}
        ><Spin size='large' /></div> : (<MovieListing movies={movies} />)
      }
    </section>
  )
}

export default HomePage;
