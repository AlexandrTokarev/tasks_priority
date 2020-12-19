import React from 'react';
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

/** Компонент который используется для активации drag-n-drop при клике внутри компонента */
const DragHandle = SortableHandle(() => <span style={{ cursor: 'move' }} >{':::'}</span>);

/** Строка таблицы */
const Row = SortableElement(({ row, columns, handleOpenModal }) => (
	<TableRow hover tabIndex={-1} key={row.id} onDoubleClick={() => handleOpenModal(row.name)} >
		<TableCell style={{ width: '10px', padding: '13px 10px' }} key={`drag-handle-row-${row.id}`}>
			<DragHandle />
		</TableCell>
		{columns.map(column => {
			const value = row[column.id];

			return (
				<TableCell key={column.id} align={column.align}>
					{column.type === 'datetime' ? moment(value).format('DD/MM/YYYY HH:mm') : value}
				</TableCell>
			);
		})}
	</TableRow>
));

/** Кастомный TableBody */
const CustomTableBody = SortableContainer(({ data, columns, handleOpenModal }) => (
	<TableBody>
		{data.length === 0
			? <TableRow key='empty-row' >
				<TableCell style={{ padding: '10px 0', textAlign: 'center' }} colSpan={5} key='empty-cell'>
					<h3>Загрузка данных</h3>
					<CircularProgress  size={24} />
				</TableCell>
			</TableRow>
			: data.sort((a, b) => a.priority > b.priority ? 1 : -1).map((row, index ) =>
				<Row row={row} key={row.id} columns={columns} handleOpenModal={handleOpenModal} index={index} />)
		}
	</TableBody>
));

// Строка необходима, чтобы кастомный боди воспринимался как TableBody
CustomTableBody.muiName = 'TableBody';

export default CustomTableBody;
