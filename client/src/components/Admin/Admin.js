import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContentWrapper from '../SnackbarContentWrapper/SnackbarContentWrapper';
import AllFosters from '../AllFosters/AllFosters';
import AddFoster from '../AddFoster/AddFoster';

const GET_FOSTERS_URL = '/api/v1/fosters';

const Admin = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarVariant, setSnackbarVariant] = useState('');
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(async () => {
		(async function getFosters() {
			await fetchData();
		})();
	}, []);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	async function fetchData() {
		setLoading(true);
		const response = await fetch(GET_FOSTERS_URL);
		setData(await response.json());
		setLoading(false);
	}

	return (
		<div>
			<AddFoster
				fetchData={fetchData}
				setSnackbarOpen={setSnackbarOpen}
				setSnackbarVariant={setSnackbarVariant}
				setSnackbarMessage={setSnackbarMessage}
			/>
			<br />
			<AllFosters
				data={data}
				loading={loading}
				fetchData={fetchData}
				setSnackbarOpen={setSnackbarOpen}
				setSnackbarVariant={setSnackbarVariant}
				setSnackbarMessage={setSnackbarMessage}
			/>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<SnackbarContentWrapper
					onClose={handleSnackbarClose}
					variant={snackbarVariant}
					message={snackbarMessage}
				/>
			</Snackbar>
		</div>
	);
};

export default Admin;
