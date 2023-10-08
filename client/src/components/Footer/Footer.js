import React from 'react';

import './Footer.css';
import location from '../../img/location-pin.png';
import email from '../../img/Combined Shape.png';
import phone from '../../img/phone.png';
import logo from '../../img/logo-footer.png';

const Footer = () => {
    return (
        <div className={'footer_wrapper'}>
            <div className={'footer'}>
                <div className={'footer_top_info'}>
                    <div className={'footer_top_info_block_wrapper'}>
                        <div className={'footer_top_info_title'}>Departments</div>
                        <div className={'footer_top_info_categories'}>
                            <span>Medical</span>
                            <span>Pharmaceuticals</span>
                            <span>Medical Equipment</span>
                        </div>
                    </div>

                    <div className={'footer_top_info_block_wrapper'}>
                        <div className={'footer_top_info_title'}>Quick Links</div>
                        <div className={'footer_top_info_categories'}>
                            <span>What do we do?</span>
                            <span>Our expertise</span>
                            <span>Request an Appointment</span>
                            <span>Book with a Specialist</span>
                        </div>
                    </div>

                    <div className={'footer_top_info_block_wrapper'}>
                        <div className={'footer_top_info_title'}>Head Office</div>
                        <div className={'footer_top_info_categories'}>
                            <div className={'contact'}>
                                <div><img src={location} alt={'location'} /></div>
                                <div>4517 Washington Ave. Manchester, Kentucky 39495</div>
                            </div>
                            <div className={'contact'}>
                                <div><img src={email} alt={'email'} /></div>
                                <div>darrell@mail.com</div>
                            </div>
                            <div className={'contact'}>
                                <div><img src={phone} alt={'phone'} /></div>
                                <div>(671) 555-0110</div>
                            </div>
                        </div>
                    </div>

                    <div className={'footer_top_info_block_wrapper'}>
                        <div><img src={logo} alt={'logo'} /></div>
                        <div className={'footer_top_info_categories'}>Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Cras blandit tincidunt ut sed.
                            Velit euismod integer convallis ornare eu.</div>
                    </div>
                </div>

                <div className={'rights_reserved'}>©2021 All Rights Reserved</div>
            </div>
        </div>
    );
};

export default Footer;