
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Container, Table } from 'reactstrap'
import { State } from '../constants/interfaces'
import { sortTable } from '../actions/personTableActions'
import { FaSortDown, FaSortUp } from 'react-icons/fa'
import AddPersonForm from './AddPersonForm'

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux




const Spinner = () => {
    return (
        <div className="spinner-border" role="status"></div>
    )
}



// Объект для того чтобы управлять значениями из order
type OrderType = {
    val: boolean
}


type Order = {
    idOrder: OrderType,
    firstNameOrder: OrderType,
    lastNameOrder: OrderType,
    emailOrder: OrderType,
    phoneOrder: OrderType
}

// Определяет порядок сортировки по столбцам
// true - не сортирован, либо сортирован по возрастанию
// false - отсортирован, при вызове сортировки массив будет инвертирован
const order: Order = {
    idOrder: { val: true },
    firstNameOrder: { val: true },
    lastNameOrder: { val: true },
    emailOrder: { val: true },
    phoneOrder: { val: true }
}

/**
 * Обновляет значения для определения того, какой порядок сортировки нужно выбрать.
 * @param orderType столбец, по которому будет производиться сортировка.
 */
function toggleOrder(orderType: OrderType) {
    const currOrd = { val: orderType.val }
    order.idOrder.val = true
    order.firstNameOrder.val = true
    order.lastNameOrder.val = true
    order.emailOrder.val = true
    order.phoneOrder.val = true
    orderType.val = !currOrd.val
}


const DataTable = (props: Props) => {
    if (props.personReducer.isFetching || props.personReducer.isLoading) {
        return (<Spinner />)
    }
    return (
        <Container>
            <AddPersonForm />
            <Table bordered>
                <thead className='table-dark'>
                    <tr>
                        <th onClick={() => {
                            props.sortTable('id', order.idOrder.val, props.personReducer.persons);
                            toggleOrder(order.idOrder)
                        }}>id {order.idOrder.val ? <FaSortDown /> : <FaSortUp />}</th>
                        <th onClick={() => {
                            props.sortTable('firstName', order.firstNameOrder.val, props.personReducer.persons);
                            toggleOrder(order.firstNameOrder)
                        }}>firstName {order.firstNameOrder.val ? <FaSortDown /> : <FaSortUp />}</th>
                        <th onClick={() => {
                            props.sortTable('lastName', order.lastNameOrder.val, props.personReducer.persons);
                            toggleOrder(order.lastNameOrder)
                        }}>lastName {order.lastNameOrder.val ? <FaSortDown /> : <FaSortUp />}</th>
                        <th onClick={() => {
                            props.sortTable('email', order.emailOrder.val, props.personReducer.persons);
                            toggleOrder(order.emailOrder)
                        }}>email {order.emailOrder.val ? <FaSortDown /> : <FaSortUp />}</th>
                        <th onClick={() => {
                            props.sortTable('phone', order.phoneOrder.val, props.personReducer.persons);
                            toggleOrder(order.phoneOrder)
                        }}>phone {order.phoneOrder.val ? <FaSortDown /> : <FaSortUp />}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.personReducer.persons.slice(0, 50).map(i => (
                        <tr key={i.id + i.firstName}>
                            <td>{i.id}</td>
                            <td>{i.firstName}</td>
                            <td>{i.lastName}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

const mapStateToProps = (state: State) => {
    return {
        personReducer: state.personReducer
    }
}

const mapDispatchToProps = {
    sortTable
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DataTable)