/* eslint-disable react/prop-types */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { fetchPersonData } from '../actions/personTableActions'
import { State } from '../constants/interfaces'
import { Button } from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

//

const DataSelectionMenu = (props: Props) => {
    return (
        <div>
            <h1>Выберите набор данных для построения таблицы: </h1>
            <Link to="/table"><Button onClick={() => props.fetchPersonData(1)}>32 строки</Button></Link>
            <Link to="/table"><Button onClick={() => props.fetchPersonData(2)}>1000 строк</Button></Link>          
        </div>
    )
}

const mapStateToProps = (state: State) => {
    return {
        personReducer: state.personReducer
    }
}

const mapDispatchToProps = {
    fetchPersonData
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(DataSelectionMenu)
