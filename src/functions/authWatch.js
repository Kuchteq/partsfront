async function authWatch({ session }) {
	if (!session.Authorization) {
		return {
			status: 303,
			redirect: '/login'
		};
	}
	return { status: 202 };
}

export default authWatch;
