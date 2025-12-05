import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ArrowRight, Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) return;

        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', {
                username: username.trim(),
                password: password
            });

            if (res.data.status === 'success') {
                localStorage.setItem('google_id_token', 'simulated_token');
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/');
            }
        } catch (error: any) {
            console.error('Login Failed', error);
            if (error.response?.status === 401) {
                alert("Incorrect Password for this User.");
            } else {
                alert('Login Error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <Box size={32} className="text-gray-800" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Muses Sandbox</h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your workspace identity</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 ml-1">Username</label>
                            <input
                                type="text"
                                placeholder="e.g. Researcher_01"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all placeholder-gray-400 text-sm font-medium"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1.5 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all placeholder-gray-400 text-sm font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-black text-white rounded-lg font-medium text-sm transition-all disabled:opacity-70"
                        >
                            {isLoading ? 'Verifying...' : 'Sign In / Register'}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </div>
                </form>

                <p className="text-center text-xs text-gray-400 mt-8">
                    Stanford University &middot; Muses Bench
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
