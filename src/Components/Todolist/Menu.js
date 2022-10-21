import React from 'react';

function Menu() {
    return (
        <div className='menu-left'>
                <ul>
                    <li data-bs-toggle='modal' data-bs-target='#exampleModal'><i className='fa-solid fa-plus size-plus' title='Thêm công việc'></i></li>
                </ul>
            </div>
    );
}

export default Menu;