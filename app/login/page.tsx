'use client';

import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { showAlert } from '@/lib/alertSlice';

interface Credential {
    email: string;
    password: string;
}

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Credential>({
        email: '',
        password: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<Partial<Credential>>({});
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let formErrors: Partial<Credential> = {};
        if (!formData.email) formErrors.email = 'email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch(`https://pyxell-agent-np8u.onrender.com/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                setLoading(false);

                if (response.ok) {
                    dispatch(showAlert({ color: 'green', message: 'Login successful!' }));
                    localStorage.setItem('token', data.access_token);
                    router.push('/chat');
                } else {
                    dispatch(showAlert({ color: 'red', message: 'Login failed. Please try again.' }));
                    console.error(data);
                }
            } catch (error) {
                setLoading(false);
                dispatch(showAlert({ color: 'red', message: 'Login failed. Please try again.' }));
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg w-[80%] shadow-lg p-8 sm:w-[500px] sm:py-12 max-w-md">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Pyxell AI</h1>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-400'}`}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <div className="relative">
                            <input
                                className={`w-full px-4 py-2 sm:py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-400'}`}
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <Button type='submit' value={!loading ? 'Login' : <Spinner />} handleSubmit={handleSubmit} />
                    </div>
                </form>
                <p className="mt-8 text-center">Don&apos;t have an account? <Link className="font-bold" href="/">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Page;
