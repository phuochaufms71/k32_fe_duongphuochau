import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetail, getMovieFromStore, removeSelectedMovie } from "../../redux/movie/movieSlice";
import { ACCESS_TOKEN } from "../../constants";
import { useEffect } from "react";
import MovieDetail from "../../components/MovieDetail/MovieDetail";
import { Spin } from "antd";

function MovieDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(getMovieFromStore);
  console.log(movie)
  const fetchMovie = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken && id) {
      dispatch(getMovieDetail({accessToken, id}))
    }
  }

  useEffect(() => {
    fetchMovie()
    return () => {
      dispatch(removeSelectedMovie())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem(ACCESS_TOKEN), id])
  return (
    <section>
        <h1>MovieDetailPage</h1>
        {
        Object.keys(movie).length === 0 ? 
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center'
          }}
        >
          <Spin size='large' />
        </div> : (<MovieDetail movie={movie} />)
      }
    </section>
  )
}

export default MovieDetailPage;
