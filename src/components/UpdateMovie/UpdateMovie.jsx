/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import './UpdateMovie.scss';
import { getMovies, updateMovie } from "../../redux/movie/movieSlice";
import { ACCESS_TOKEN } from "../../constants";
import Spin from '../../components/components/Spin/Spin';

function UpdateMovie({ setIdSelectedMovie, selectedMovie, setIsUpdateMovie }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: selectedMovie?.title || '',
    year: selectedMovie?.year || '',
    poster: selectedMovie?.poster || '',
  })

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    setLoading(true)
    await dispatch(updateMovie({
      accessToken,
      id: selectedMovie._id,
      updateData: formData
    }))
    await dispatch(getMovies(accessToken))
    setLoading(false)
    setIdSelectedMovie('')
    setIsUpdateMovie(false)
    setFormData({
      title: '',  
      year: '',
      poster: ''
    })
  }
  return loading ? <Spin /> : (
    <section className="update-movie">
        <h1 className="title">Update movie</h1>
        <form
          onSubmit={handleUpdateMovie}
          className="form-update"
        >
          <input 
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Movie title"
            autoFocus
            className="input" 
          />
          <input 
            type="text"
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: e.target.value })}
            placeholder="Year release"
            className="input" 
          />
          <textarea 
            rows={4}
            type="text"
            value={formData.poster}
            onChange={e => setFormData({ ...formData, poster: e.target.value })}
            placeholder="Movie poster"
            className="input"
          />
          <div className="update-action">
            <button type="submit" className="btn btn-submit">
              Update
            </button>
            <button className="btn btn-cancel" onClick={() => setIsUpdateMovie(false)}>Cancel</button>
          </div>
        </form>
    </section>
  )
}

export default UpdateMovie;
