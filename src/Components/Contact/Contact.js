import React from 'react';
import './Contact.scss';

function Contact() {
    return (
        <div className='content'>
            <div className='container height-body'>
                <div className="container1">
                    <div className="infor">
                        <h1 style={{ marginBottom: 20, fontSize: 50, color: "#FFF" }}>Thông tin cá nhân</h1>
                        <ul>
                            <li>
                                <span>Tên: Nguyễn Hữu Minh Dương</span>
                            </li>
                            <li>
                                <span>MSSV: 46.01.104.039</span>
                            </li>
                            <li>
                                <span>Năm sinh: 18/07/2002</span>
                            </li>
                            <li>
                                <span>Quê quán: Bình Thuận</span>
                            </li>
                            <li>
                                <span>Giới tính: Nam</span>
                            </li>
                            <li>
                                <span>Địa chỉ: Thạnh xuân 24, Quận 12, TPHCM</span>
                            </li>
                            <li>
                                <span>Email: minhduong18072002@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                    <div className="glassstatic" data-tilt=""></div>
                </div>
            </div>

        </div>
    );
}
export default Contact