import React, { useState, useEffect} from 'react';
import { arrayMove } from 'react-sortable-hoc';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { tasks } from '../../data/data';
import CustomTableBody from './components/CustomTableBody';

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 730,
	}
});

/** Колонки таблицы */
const columns = [
	{ id: 'id', label: 'ИД', minWidth: 40, align: 'center', variant: 'head', type: 'number' },
	{ id: 'name', label: 'Название', minWidth: 500, align: 'left', variant: 'head', type: 'string' },
	{ id: 'created', label: 'Создана', minWidth: 170, align: 'center', variant: 'head', type: 'datetime' },
	{ id: 'manager', label: 'Автор', minWidth: 170, align: 'center', variant: 'head', type: 'string'},
	{ id: 'priority', label: 'Приоритет', maxWidth: 70, align: 'center', variant: 'head', type: 'number'},
];


/** Таблица с задачами */
const TasksTable = props => {
	const { handleOpenModal } = props;

	const classes = useStyles();

	//Данные для таблицы
	const [data, setData] = useState([]);

	/**
	 * Метод вызывается, после перетаскивания строки
	 * @param {number} oldIndex Старый индекс перетаскиваемого элемента
	 * @param {number} newIndex Новый индекс перетаскиваемого элемента
	 */
	const onSortEnd = ({ oldIndex, newIndex }) => {
		// перемещаем элемент на новую позицию в массиве
		let sortData = arrayMove(data, oldIndex, newIndex);

		let [startIdx, endIdx] = newIndex < oldIndex ? [newIndex, oldIndex] : [oldIndex, newIndex];

		// изменяем поле priority
		for(let i = startIdx; i <= endIdx; i++) {
			sortData[i].priority = i + 1;
		}

		setData(sortData);
	};

	useEffect(() => {
		// имитация загрузки данных (например с использованием fetch, axios, XHR)
		setTimeout(() => {
			setData(tasks);
		}, 1800)
	}, []);

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader size='medium' aria-label='tasks table'>
					<TableHead>
						<TableRow>
							<TableCell key='drag-handle-header' style={{ width: '10px', padding: '13px 5px' }}>&nbsp;</TableCell>
							{columns.map(column => (
								<TableCell
									key={`cell-header-${column.id}`}
									align='center'
									style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
									variant={column.variant}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<CustomTableBody
						data={data}
						columns={columns}
						onSortEnd={onSortEnd}
						handleOpenModal={handleOpenModal}
						useDragHandle
					/>
				</Table>
			</TableContainer>
		</Paper>
	)
};

export default TasksTable;
