import React, {useState, useEffect} from 'react';
import Header from './Header.js';
import Genres from './Genres.js';
import NewGenre from './NewGenre.js';
import EditGenre from './EditGenre.js';
import axios from 'axios';
import
{
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const Home = () =>
{
    return <h1>Home</h1>;
}

function App() 
{
    const [data, setData] = useState({});
    useEffect(function()
    {
        axios.get('/api').then(res => 
            {
                setData(res.data)
            })
    }, [])
    let html = 
        <Router>
            <div>
                <Header/>
                <Route path='/' exact component={Home}/>
                <Route path='/generos' exact component={Genres}/>
                <Route path='/generos/novo' exact component={NewGenre}/>
                <Route path='/generos/:id' exact component={EditGenre}/>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </Router>;
    return html;
}

export default App;
