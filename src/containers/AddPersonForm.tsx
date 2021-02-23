
import { connect, ConnectedProps } from 'react-redux'
import { Col, Form, FormGroup, Row } from 'reactstrap'
import { State } from '../constants/interfaces'
import { addPerson } from '../actions/personTableActions'
import React from 'react'

// Подключение Redux 
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

/** Состояние компонента */
type FormState = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    validationErr: ValidationErrors,
    isIdValid: boolean,
    isFirstNameValid: boolean,
    isLastNameValid: boolean,
    isEmailValid: boolean,
    isPhoneValid: boolean,
    isFormValid: boolean
}

/** Список ошибок при валидации. */
interface ValidationErrors {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}

/** Контейнер. Форма для добавления новой строки в список. */
class AddPersonForm extends React.Component<Props, FormState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            validationErr: { id: '', firstName: '', lastName: '', email: '', phone: '' },
            isIdValid: false,
            isFirstNameValid: false,
            isLastNameValid: false,
            isEmailValid: false,
            isPhoneValid: false,
            isFormValid: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (this.state.isFormValid) {
            this.props.addPerson({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                address: {
                    state: "MS",
                    streetAddress: "7092 Vitae Rd",
                    city: "Armada",
                    zip: "185820"
                },
                phone: this.state.phone
            })
        }
    }

    validate = (fieldName: string, value: string | number) => {
        let isFormValid = this.state.isFormValid
        let isIdValid = this.state.isIdValid
        let isFirstNameValid = this.state.isFirstNameValid
        let isLastNameValid = this.state.isLastNameValid
        let isEmailValid = this.state.isEmailValid
        let isPhoneValid = this.state.isPhoneValid
        const validationErr = this.state.validationErr

        switch (fieldName) {
            case 'id': {
                if (value >= 0) {
                    validationErr.id = ''
                    isIdValid = true
                } else {
                    validationErr.id = 'Число должно быть положительным'
                    isIdValid = false
                }
                break
            }
            case 'firstName': {
                if (value.toString().match(/^([A-Z]{1}[a-z]{1,15})$/)) {
                    validationErr.firstName = ''
                    isFirstNameValid = true
                } else {
                    isFirstNameValid = false
                    value.toString().length < 2 ? 
                    validationErr.firstName = 'Имя слишком короткое' :                    
                    validationErr.firstName = 'Имя содержит недопустимые символы.'
                }
                break
            }
            case 'lastName': {
                if (value.toString().match(/^([A-Z]{1}[a-z]{1,15})$/)) {
                    validationErr.lastName = ''
                    isLastNameValid = true
                } else {
                    isLastNameValid = false
                    value.toString().length < 2 ? 
                    validationErr.lastName = 'Фамилия слишком короткая' : 
                    validationErr.lastName = 'Фамилия содержит недопустимые символы.'
                }
                break
            }
            case 'email': {
                if (value.toString().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    isEmailValid = true
                    validationErr.email = ''
                } else {
                    isEmailValid = false
                    validationErr.email = 'E-mail содержит недопустимые символы.'
                }
                break
            }
            case 'phone': {
                if ((value.toString().match(/^(\([0-9]{3}\)[0-9]{3}-[0-9]{4})$/) || value.toString().match(/^([0-9]{10})/))) {
                    isPhoneValid = true
                    validationErr.phone = ''
                } else {
                    isPhoneValid = false
                    validationErr.phone = 'Недопустимый формат номера телефона.'
                }
                break
            }
        }

        isFormValid = isIdValid && isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid

        this.setState({
            ...this.state,
            isIdValid: isIdValid,
            isFirstNameValid: isFirstNameValid,
            isLastNameValid: isLastNameValid,
            isEmailValid: isEmailValid,
            isPhoneValid: isPhoneValid,
            isFormValid: isFormValid,
            validationErr: validationErr
        })
    }


    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const id = e.currentTarget.id
        const val = e.currentTarget.value
        this.setState({ ...this.state, [e.currentTarget.id]: e.currentTarget.value }, () => this.validate(id, val))

    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            {this.state.isIdValid ? null : <b>{this.state.validationErr.id}</b>}
                            <input onBlur={this.onInputChange} id="id" type="number" className="form-control" placeholder="id" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            {this.state.isFirstNameValid ? null : <b>{this.state.validationErr.firstName}</b>}
                            <input onBlur={this.onInputChange} id="firstName" type="text" className="form-control" placeholder="firstName" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            {this.state.isLastNameValid ? null : <b>{this.state.validationErr.lastName}</b>}
                            <input onBlur={this.onInputChange} id="lastName" type="text" className="form-control" placeholder="lastName" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            {this.state.isEmailValid ? null : <b>{this.state.validationErr.email}</b>}
                            <input onBlur={this.onInputChange} id="email" type="email" className="form-control" placeholder="email" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            {this.state.isPhoneValid ? null : <b>{this.state.validationErr.phone}</b>}
                            <input onBlur={this.onInputChange} id="phone" type="tel" className="form-control" placeholder="phone" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <input className="form-control" type="submit" disabled={!this.state.isFormValid} />
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        personReducer: state.personReducer
    }
}

const mapDispatchToProps = {
    addPerson
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(AddPersonForm)