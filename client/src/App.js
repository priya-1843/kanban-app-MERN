import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Board from './pages/Board';

import './css/custom-scrollbar.css';

function App() {
    const theme = createTheme({ palette: { mode: 'dark' } });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseLine />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/boards" element={<Home />} />
                        <Route path="/boards/:boardId" element={<Board />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
