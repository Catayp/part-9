import React from 'react';

const Header: React.FC<{ name: string }> = ({name}) =>(
    <div>{name}</div>
);

export default Header