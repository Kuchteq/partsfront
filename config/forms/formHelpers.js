const getCurrentTime = () => {
	return (
		new Date().toISOString().substring(0, 10) +
		' ' +
		new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
	);
};
export { getCurrentTime };
