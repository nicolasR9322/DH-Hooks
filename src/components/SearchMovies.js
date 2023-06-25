import React, { useEffect , useState} from 'react';

import noPoster from '../assets/images/404.png';

function SearchMovies(){

	const movies = [
		{
			"Title": "Parchís",
			"Year": "1983",
			"Poster": "https://m.media-amazon.com/images/M/MV5BYTgxNjg2MTAtYjhmYS00NjQwLTk1YTMtNmZmOTMyNTAwZWUwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg"
		},
		{
			"Title": "Brigada en acción",
			"Year": "1977",
			"Poster": "N/A"
		},
	];

	const keyword = 'PELÍCULA DEMO';

	// Credenciales de API
	const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=98d7a67e'; // Intenta poner cualquier cosa antes para probar

	const [state, setState] = useState ( {
		movies:[],
	})

	const [searchValue, setSearchValue] = useState ("")


	useEffect(() => { 
		if(searchValue){
			fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=98d7a67e`)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
				setState(prevState => ({
					...prevState, movies: data.Search || [],
				}))
			
			})
			.catch(error => console.log(error))
		}

		
	},
	[searchValue])

	const handleSearch = e => {
		e.preventDefault()
		setSearchValue('')
	}


	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={handleSearch}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {searchValue}</h2>
						</div>
						{/* Listado de películas */}
						{
							state.movies.length > 0 && state.movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;