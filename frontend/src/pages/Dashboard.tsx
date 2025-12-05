import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Key, Calendar, Cpu, ArrowRight, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const scenarios = [
        {
            id: 1,
            title: "Credential Management",
            desc: "Simulate secure key distribution and access control protocols.",
            icon: <Key size={24} />,
            status: "dev"
        },
        {
            id: 2,
            title: "Meeting Scheduler",
            desc: "Agent coordination for multi-party scheduling constraints.",
            icon: <Calendar size={24} />,
            status: "dev"
        },
        {
            id: 3,
            title: "Inference Queue",
            desc: "Resource allocation strategies for shared model inference.",
            icon: <Cpu size={24} />,
            status: "dev"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-900 text-white p-1.5 rounded-lg">
                            <LayoutGrid size={18} />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Muses</span>
                        <span className="text-gray-400 font-light mx-2">/</span>
                        <span className="text-sm font-medium text-gray-600">Sandbox</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">{user.username}</p>
                            <p className="text-xs text-gray-500">Research Session</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulations</h2>
                    <p className="text-gray-500">Select an environment to begin your agent evaluation.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scenarios.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col h-64"
                        >
                            <div className="p-6 flex-1">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-700 mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-xl">
                                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Coming Soon
                                </span>
                                <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
