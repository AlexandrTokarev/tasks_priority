import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { TasksTable, Modal } from './components';
import theme from './theme';

function App() {

	// Флаг для отображения модального окна
	const [modal, setModal] = useState({ open: false, text: ''});

	/** Метод для отображения модального окна и его контента */
	const handleOpenModal = (text) => {
		setModal({
			open: true,
			text
		});
	};

	/** Метод для закрытия модального окна */
	const handleCloseModal = () => {
		setModal({
			open: false,
			text: ''
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="xl" fixed>
				<TasksTable handleOpenModal={handleOpenModal}/>
				<Modal open={modal.open} handleCloseModal={handleCloseModal} text={modal.text}/>
			</Container>
		</ThemeProvider>
	);
}

export default App;
