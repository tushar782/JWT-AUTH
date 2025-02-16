// frontend/rbac/src/components/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

const VerifyEmail = () => {
    const [status, setStatus] = useState('Verifying...');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = new URLSearchParams(location.search).get('token');
                if (!token) {
                    setStatus('Verification token is missing');
                    return;
                }

                // Log the URL being called
                console.log('Calling verification endpoint:', `/auth/verify-email?token=${token}`);

                const response = await api.get(`/auth/verify-email?token=${token}`);
                console.log('Verification response:', response);

                setStatus('Email verified successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error('Verification error:', error);
                setStatus(error.response?.data?.message || 'Verification failed');
            }
        };

        verifyEmail();
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">{status}</h2>
            </div>
        </div>
    );
};

export default VerifyEmail;