import './App.css';
import DataCreate from './create.jsx';
import DataView from './view.jsx';
import Home from './home.jsx';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/view">View Data</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Data</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/view" element={<DataView />} />
                    <Route path="/create" element={<DataCreate />} />
                    <Route path="/" element={<Home />} />
                </Routes>

            </div>
        </Router>
    );
}

export default App;
