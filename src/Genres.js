import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Genres = () =>
{
    const [data, setData] = useState([]);
    useEffect(function()
    {
        axios
            .get('/api/genres')
            .then(res =>
            {
                setData(res.data.data);
            })
    })

    function deleteGenre(id)
    {
        axios
            .delete('/api/genres/'+id)
            .then(() =>
                {
                    const filter = data.filter(item => item.id !== id);
                    setData(filter);
                })
    }

    function renderLine(reccord)
    {
        let line = 
        (
            <tr key={reccord.id}>
                <th scope='row'>{reccord.id}</th>
                <td>{reccord.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenre(reccord.id)}>Remover</button>
                    <Link className='btn btn-warning' to={'/generos/' + reccord.id}>Editar</Link>    
                </td>
            </tr>
        );

        return line;
    }

    let genresContainer = 
    (
        <div className='container'>
            <h1>Gêneros</h1>

            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(renderLine)}
                </tbody>
            </table>
            <div>
                <Link className='btn btn-primary' to='/generos/novo'>Novo Gênero</Link>
            </div>
        </div>
    )

    if(data.length === 0)
    {
        genresContainer =
        (
            <div className='container'>
                <h1>Gêneros</h1>

                <div className='alert alert-warning' role='alert'>
                    Você não possui gêneros criados.
                </div>
                <div>
                <Link className='btn btn-primary' to='/generos/novo'>Novo Gênero</Link>
                </div>
            </div>
        )
    }

    return genresContainer;
}

export default Genres;