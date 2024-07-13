'use client'

// app/alertUser.tsx
import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { clearAlert } from '../../lib/alertSlice';
import { color } from "@material-tailwind/react/types/components/alert";

export interface AlertUserType {
    message: string;
    color: string; // Using string type as the color type from @material-tailwind/react
}

const AlertUser: React.FC = () => {
    const { message, color } = useAppSelector((state) => state.alert);
    const dispatch = useAppDispatch();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                dispatch(clearAlert());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    return (
        isVisible && (
            <div className={`w-[80%] max-w-[390px] text-xl mt-4 fixed z-50 p-4 mb-4 text-black rounded-lg ${color === 'green' && 'bg-green-300'} ${color === 'red' && 'bg-red-300'}`} role="alert">
                {message}
            </div>
        )
    );
};

export default AlertUser;
