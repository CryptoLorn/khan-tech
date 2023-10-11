import React, { useState } from 'react';

import './BurgerMenu.css';
import DropdownMenu from '../DropDownMenu/DropdownMenu';

const BurgerMenu = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    return (
        <div>
            <div className={'burger_menu'} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {isOpenMenu && (
                <div className={'menu_wrapper'}>
                    <div className={'menu'}>
                        <div className={'menu_category'}>Home</div>
                        <div className={'menu_category'}><DropdownMenu name={'Services'} /></div>
                        <div className={'menu_category'}><DropdownMenu name={'About'} /></div>
                        <div className={'menu_category'}>Book now</div>
                        <div className={'menu_category'}><DropdownMenu name={'Shop'} /></div>
                        <div className={'menu_category'}>Blog</div>
                        <div className={'menu_category'}>Contact</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;