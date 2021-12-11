import React, { FC, ReactNode } from 'react';

type Props = {
    children?: ReactNode;
}

const Navbar: FC<Props> = ({children}) => (
    <div>
        <nav>
            <ul className="w-full flex flex-wrap justify-center py-8 list-none bg-bcPrimary">
                {children}
            </ul>
        </nav>
    </div>
);

export default Navbar;
