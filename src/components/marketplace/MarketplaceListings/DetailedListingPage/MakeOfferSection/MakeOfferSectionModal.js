import React from "react";
import {Alert, FormControl, FormGroup, Modal} from "react-bootstrap";
import DayPicker, {DateUtils} from "react-day-picker";
import Button from "@material-ui/core/Button";

export const makeOfferModalService = { openModal: null };

export class MakeOfferSectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            offerAmount: 1,
            offerMessage: '',
            offerDateRange: {
                from: undefined,
                to: undefined,
            },
            loading: false
        };

        makeOfferModalService.openModal = this.toggleModal;
    }

    toggleModal = () => this.setState({isShow: !this.state.isShow});

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state.offerDateRange);
        this.setState({offerDateRange: range});
    };

    render() {
        const { isShow, offerAmount, offerMessage, offerDateRange, loading } = this.state;
        const { onMakeOffer } = this.props;

        const { from, to } = offerDateRange;
        const modifiers = { start: from, end: to };

        let isInvalid = () => {
            return offerAmount <= 0
                || typeof offerDateRange.from === 'undefined'
                || typeof offerDateRange.to === 'undefined';
        };

        return (
            <Modal show={isShow} onHide={() => this.setState({isShow: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Your Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId='control-form-title'>
                        <h4>Offer Amount</h4>
                        <FormControl value={offerAmount} onChange={(e) => this.setState({offerAmount: e.target.value})} placeholder='Enter your offer price' type='number' min='1' step='1' />
                    </FormGroup>
                    <FormGroup controlId='control-form-pitch'>
                        <h4>Brief Message (150 characters max)</h4>
                        <FormControl componentClass='textarea'
                                     maxLength={150}
                                     rows={5}
                                     style={{ resize: 'vertical' }}
                                     onChange={(e) => this.setState({offerMessage: e.target.value})}
                                     value={offerMessage}
                        />
                    </FormGroup>
                    <FormGroup>
                        <div>
                            <div className="date-range-container">
                                <DayPicker
                                    className="Selectable"
                                    numberOfMonths={2}
                                    selectedDays={[from, { from, to }]}
                                    modifiers={modifiers}
                                    onDayClick={this.handleDayClick}
                                />
                                <p className='selected-range-label' style={{display: 'none'}}>
                                    {!from && !to && 'Please select the first day'}
                                    {from && !to && 'Please select the last day'}
                                    {from && to && `Selected from ${from.toLocaleDateString()}
                            to ${to.toLocaleDateString()}`}{'  '}
                                    {from && to && (
                                        <button
                                            className='link'
                                            onClick={() => this.setState({
                                                offerDateRange: {
                                                    from: undefined,
                                                    to: undefined
                                                }
                                            })}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    </FormGroup>
                </Modal.Body>

                <Alert bsStyle='info'>
                    <Button
                        onClick={async () => {
                            this.setState({loading: true});

                            let resp = await onMakeOffer(this.state);

                            if(resp) this.toggleModal();
                        }}
                        disabled={loading || isInvalid()}
                        style={{ width: '100%', fontSize: '15px' }}
                        color='primary'
                    >
                        Make Offer
                    </Button>
                </Alert>
            </Modal>
        )
    }
}
