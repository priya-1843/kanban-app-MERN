import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/userSlice';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';

const AppLayout = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigation('/login');
            } else {
                dispatch(setUser(user));
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigation]);
    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: 'max-content',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
