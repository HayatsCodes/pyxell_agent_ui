'use client'

import { Provider } from 'react-redux';
import { store } from '../lib';

import React from 'react'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>

    )
}

export default StoreProvider