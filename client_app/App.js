import React, { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import APIService from './services/APIService';
import flashObj from './services/FlashService';
import Flash from './components/Flash';

const App = () => {
	const [flashType, setFlashType] = useState(null);
	const [flashMsg, setFlashMsg] = useState(null);

	flashObj.setFuncs(setFlashType, setFlashMsg);

	function renderFlash() {
		if (flashMsg) {
			return (
				<Flash type={flashType} message={flashMsg} />
			);
		}
	}

	return (
		<div className="app">
			<Header />
			{ renderFlash() }
			<Body apiService={new APIService} />
		</div>
	);
}

export default App;
