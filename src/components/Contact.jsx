import React from "react";
import "../style/Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // import fontAwesome
import { faUser, faPhoneVolume, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // import icons solids

const Contact = (props) => {
    return (
        <div className="mx-2">
            <div className="container title-contact my-4">
                <div className="row">
                    <div className="col p-2">
                        <h4>
                            <FontAwesomeIcon icon={faUser} className="me-3" />
                            {props.name}
                        </h4>
                    </div>

                    <div className="col p-2">
                        <h4>
                            <FontAwesomeIcon icon={faPhoneVolume} className="me-3" />
                            {props.phone}
                        </h4>
                    </div>

                    <div className="col text-end p-2">
                        <h4>
                            <FontAwesomeIcon icon={faTrashAlt} className="me-3" onClick={() => { props.remove(props.id) }} />
                        </h4>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;