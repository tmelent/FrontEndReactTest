/* eslint-disable react/prop-types */
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { fetchPersonData } from '../actions/personTableActions'
import { State } from '../constants/interfaces'


type PropsFromRedux = ConnectedProps<typeof connector> 
type Props = PropsFromRedux 
const PersonTable = (props: Props) => (

    <div>
        <button onClick={() => props.fetchPersonData(1)}>Data 1</button>
        <button onClick={() => props.fetchPersonData(2)}>Data 2</button>
    </div>
)



const mapStateToProps = (state: State) => {
    return {
        personState: state.personState
    }
}
const mapDispatchToProps = {
    fetchPersonData
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(PersonTable)
