import React from "react";
import {Button, Modal} from "react-bootstrap";

export let offerDialogConfirmationService = { openModal: () => {}}

export class OfferDialogConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            options: null
        };

        offerDialogConfirmationService.openModal = this.toggleModal;
    }

    submit = () => {
        const { options } = this.state;
        options.btnAction();
        this.toggleModal({open: false, options: null});
    };

    toggleModal = ({open, options}) => {
        this.setState({open, options})
    };

    render () {
        const { open, options } = this.state;
        if( options == null ) return <div/>;
        return (
            <Modal
                show={open}
                onHide={() => this.toggleModal({open: false, options: null})}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{options.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {options.content}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.toggleModal({open: false, options: null})}>Close</Button>
                    <Button bsStyle={options.btnType} onClick={() => this.submit()}>{options.btnTitle}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
