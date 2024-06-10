// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

import AlertUser from './components/Alert';
import StoreProvider from './StoreProvider';


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div className='flex justify-center'>
            <AlertUser />
          </div>
          {children}
        </body>
      </html>
    </StoreProvider>

  );
};

export default RootLayout;
