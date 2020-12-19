import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/** Модальное окно */
const Modal = ({ open, handleCloseModal, text }) => (
	<Dialog open={open} onClose={handleCloseModal}>
		<DialogTitle id='modal-title'>Произвольный заголовок</DialogTitle>
		<DialogContent>
			<DialogContentText>
				{text || ''}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCloseModal} color='primary'>
				Закрыть
			</Button>
		</DialogActions>
	</Dialog>
);

export default Modal;
