import React, { useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import EditFoster from '../EditFoster/EditFoster';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const DELETE_URL = '/api/v1/fosters/delete';

const PhotoActions = (props) => {
	const [edit, setEdit] = useState(false);
	const [deleting, setDeleting] = useState(false);

	function handleEdit(e) {
		setEdit(true);
	}

	const handleDeleteCancel = () => {
		setDeleting(false);
	};

	async function handleDeleteOK(e) {
		try {
			const body = {
				Key: props.docAwsKey,
			};
			const response = await fetch(DELETE_URL, {
				method: 'delete',
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			});

			if (!response.ok) {
				throw new Error(
					`Status:  ${response.status} Message: ${response.statusText}`
				);
			}

			setDeleting(false);
			props.setSnackbarVariant('success');
			props.setSnackbarMessage(`${props.fosterName} has been deleted`);
			props.setSnackbarOpen(true);
			props.fetchData();
		} catch (error) {
			props.setSnackbarVariant('error');
			props.setSnackbarMessage(error.message);
			props.setSnackbarOpen(true);
		}
	}

	return (
		<div>
			<ButtonGroup
				variant="contained"
				color="primary"
				aria-label="contained primary button group"
			>
				<Button onClick={handleEdit}>Edit</Button>
				<Button onClick={setDeleting}>Delete</Button>
			</ButtonGroup>
			<EditFoster
				docAwsKey={props.docAwsKey}
				imageAwsKey={props.imageAwsKey}
				showDialog={edit}
				photoURL={props.photoURL}
				fosterName={props.fosterName}
				adoptionAgency={props.adoptionAgency}
				receivedDate={props.receivedDate}
				adoptedDate={props.adoptedDate}
				facebook={props.facebook}
				instagram={props.instagram}
				comments={props.comments}
				setEdit={setEdit}
				fetchData={props.fetchData}
				setSnackbarOpen={props.setSnackbarOpen}
				setSnackbarVariant={props.setSnackbarVariant}
				setSnackbarMessage={props.setSnackbarMessage}
			/>
			<ConfirmationDialog
				showDialog={deleting}
				title="Delete Foster?"
				contentText={`Are you sure you want to delete ${props.fosterName}?`}
				handleOK={handleDeleteOK}
				handleCancel={handleDeleteCancel}
			/>
		</div>
	);
};

export default PhotoActions;
