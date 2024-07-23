import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMovies, getMoviesFromStore} from "../../redux/movie/movieSlice"
import CreateMovie from "../../components/CreateMovie/CreateMovie";
import UpdateMovie from "../../components/UpdateMovie/UpdateMovie";
import './DashboardAdmin.scss';
import { ACCESS_TOKEN } from "../../constants";
import Spin from "../../components/components/Spin/Spin";

function DashboardAdmin() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { movies } = useSelector(getMoviesFromStore);
  console.log('movies in dashboard', movies);

  const [isCreateNewMovie, setIsCreateNewMovie] = useState(false);
  const [isUpdateMovie, setIsUpdateMovie] = useState(false);
  const [idSelectedMovie, setIdSelectedMovie] = useState('');

  const selectedMovie = useMemo(() => {
    return movies.find(item => item._id === idSelectedMovie) || {}
  }, [movies, idSelectedMovie])

  const handleDeleteMovie = async (movieId) => {
    if (confirm("Delete movie?")) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      setLoading(true);
      await dispatch(deleteMovie({
        accessToken,
        id: movieId
      }))
      await dispatch(getMovies(accessToken))
      setLoading(false)
      setIdSelectedMovie('')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 20
      }}
      className="dashboard"
    >
        <h1>Admin dashboard</h1>
          <button
            className="new-movie-btn"
            onClick={() => setIsCreateNewMovie(true)}
          >
            <div className="fa-solid fa-plus"></div>
            New movie
          </button>
        {
          isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie} />
        }
        {
          isUpdateMovie && <UpdateMovie setIdSelectedMovie={setIdSelectedMovie} selectedMovie={selectedMovie} setIsUpdateMovie={setIsUpdateMovie} />
        }

        <section>
          <div className="table-header">
            <p className="table-heading">Id</p>
            <p className="table-heading">Title</p>
            <p className="table-heading">Year</p>
            <p className="table-heading">Poster</p>
            <p className="table-heading">Action</p>
          </div>
          <>
            {
              movies.length && movies?.map(movie => {
                const { _id, title, year, poster } = movie;

                return (
                  <div key={_id} className="table-body">
                    <p className="table-data">{_id}</p>
                    <p className="table-data">{title}</p>
                    <p className="table-data">{year}</p>
                    <p className="table-data">
                      <img src={poster} alt="movie-poster" className="table-data-poster"/>
                    </p>
                    <p className="table-data table-action">
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          setIsUpdateMovie(true)
                          setIdSelectedMovie(_id)
                        }}
                      >Edit</button>
                      <button className="btn btn-delete" onClick={() => {
                        setIdSelectedMovie(_id)
                        handleDeleteMovie(_id)
                        }}>
                        Delete
                        { loading && idSelectedMovie === _id && <Spin />}
                      </button>
                    </p>
                  </div>
                )
              })
            }
          </>
        </section>
    </div>
  )
}

export default DashboardAdmin;
