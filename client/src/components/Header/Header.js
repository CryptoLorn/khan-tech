import React from 'react';

import './Header.css';
import logo from '../../img/logo.png';
import DropdownMenu from '../DropDownMenu/DropdownMenu';

const Header = () => {

    return (
        <div className={'header_wrapper'}>
            <div className={'header'}>
                <div className={'header_left_block'}>
                    <div><img src={logo} alt={'logo'} /></div>
                    <div>
                        <div className={'header_help_text'}>Need Help?</div>
                        <div className={'header_help_phone'}>(514) 543-9936</div>
                    </div>
                </div>

                <div className={'header_right_block'}>
                    <div className={'header_right_block_menu'}>Home</div>
                    <div className={'header_right_block_menu'}><DropdownMenu name={'Services'} /></div>
                    <div className={'header_right_block_menu'}><DropdownMenu name={'About'} /></div>
                    <div className={'header_right_block_menu'}>Book now</div>
                    <div className={'header_right_block_menu'}><DropdownMenu name={'Shop'} /></div>
                    <div className={'header_right_block_menu'}>Blog</div>
                    <div className={'header_right_block_menu'}>Contact</div>
                </div>
            </div>
        </div>
    );
};

export default Header;