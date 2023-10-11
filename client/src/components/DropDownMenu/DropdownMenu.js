import React, { useState } from 'react';

import './DropdownMenu.css';
import './media.css';

const DropdownMenu = ({name}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(true);
    };

    const toggleMenuHide = () => {
        setIsOpen(false);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(true);
    };

    const toggleSubMenuHide = () => {
        setIsSubMenuOpen(false);
    };

    return (
        <div className='dropdown' onMouseEnter={toggleMenu} onMouseLeave={toggleMenuHide}>
            <div>
                <div
                    className={'dropdown_title'}
                >
                    {name}
                    <div className={isOpen ? 'top_arrow' : 'bottom_arrow'}> </div>
                </div>

                {isOpen && (
                    <div className={'dropdown_menu_item'} onMouseEnter={toggleMenu} onMouseLeave={toggleMenuHide}>
                        <span>Sub-Menu 1</span>
                        <span
                            onMouseEnter={toggleSubMenu}
                            onMouseLeave={toggleSubMenuHide}
                        >
                        Sub-Menu 2
                        <div className={'right_arrow'}> </div>
                            {isSubMenuOpen && (
                                <div className={'submenu_item_wrapper'}>
                                    <span>Turpis consectetur 3</span>
                                    <span>Senectus cursus pretium malesuada.</span>
                                    <span>Luctus neque frin 4</span>
                                </div>
                            )}
                    </span>
                        <span>Turpis consectetur 3</span>
                        <span>Luctus neque frin 4</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;