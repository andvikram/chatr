import React from 'react';

const Header = () => {
	const title = 'Welcome to Chatr!';

	return (
		<div className="header">
      <h1><a className="header-link" href="/">{title}</a></h1>
		</div>
	);
}

export default Header;