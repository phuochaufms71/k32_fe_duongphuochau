/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import './CreateMovie.scss';
import { createNewMovie, getMovies } from "../../redux/movie/movieSlice";
import { ACCESS_TOKEN } from "../../constants";
import Spin from "../../components/components/Spin/Spin"

function CreateMovie({ setIsCreateNewMovie }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    poster: ''
  });
 
  const handleCreateNewMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    await dispatch(createNewMovie({
      accessToken,
      newMovie: formData
    }))

    await dispatch(getMovies(accessToken))
    setFormData({
      title: '',
      year: '',
      poster: ''
    }
    )
    setLoading(false)
    setIsCreateNewMovie(false)
  }

  return loading ? <Spin /> : (
    <section className="create-movie">
      <h1 className="title">Create a new movie</h1>      
      <form 
        onSubmit={handleCreateNewMovie}
        className="form-create"
      >
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Movie title"
          className="input"
          autoFocus
        />
        <input 
          type="text" 
          value={formData.year} 
          onChange={(e) => setFormData({...formData, year: e.target.value})}
          placeholder="Year release"
          className="input"
        />
        <textarea 
          rows={4} 
          value={formData.poster} 
          onChange={(e) => setFormData({...formData, poster: e.target.value})}
          placeholder="Movie poster"
          className="input"
        >
        </textarea>
        <div className="create-action">
          <button
            type="submit"
            onClick={handleCreateNewMovie}
            className="btn btn-submit"
          >Create</button>
          <button className="btn btn-cancel" onClick={() => setIsCreateNewMovie(false)}>Cancel</button>
        </div>
      </form>  
    </section>
  )
}

export default CreateMovie;
