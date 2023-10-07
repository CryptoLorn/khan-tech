import React, { useState } from 'react';

import './DropdownMenu.css';

const DropdownMenu = ({name}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <div className='dropdown' onMouseEnter={toggleMenu}>
            <div
                className={'dropdown_title'}
            >
                {name}
                <div className={'bottom_arrow'}> </div>
            </div>

            {isOpen && (
                <ul className='dropdown_menu_item'>
                    <li>Item 1</li>
                    <li onMouseEnter={toggleSubMenu}
                        onMouseLeave={toggleSubMenu}
                    >
                        Item 2
                        {isSubMenuOpen && (
                            <div className="submenu">
                                <ul>
                                    <li>Підпункт 1</li>
                                    <li>Підпункт 2</li>
                                    <li>Підпункт 3</li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li>Item 3</li>
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;