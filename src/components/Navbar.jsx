import React, { useState, useRef, useEffect } from "react";
import { v4 as key } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // import fontAwesome
import { faList, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'; // import icons solids

import Contact from "./Contact";
import "../style/App.css";

const Navbar = () => {

    // hook useState
    const [contact, setContact] = useState(() => {  // set contacts
        return { id: "", name: "", phone: "" }
    });

    const [listContacts, setListContacts] = useState(() => { // keep contacts
        return [];
    });

    // hook useRef
    const inputName = useRef();
    const inputPhone = useRef();

    // functions
    //function def contacts
    function addName(event) {
        setContact((oldContacts) => {
            return { ...oldContacts, name: event.target.value };
        })
    }

    // function def phone
    function addPhone(event) {
        setContact((oldPhone) => {
            return { ...oldPhone, phone: event.target.value };
        });
    }

    // function to add contacts
    function addContact() {
        // validation fields
        if (contact.name === "" || contact.phone === "") {
            return;
        }

        // validation of contact duplicated
        let double = listContacts.find((ct) => {
            return ct.name === contact.name && ct.phone === contact.phone;
        });

        if (typeof double !== "undefined") {
            inputPhone.current.focus();
            return;
        }

        // add contacts
        setListContacts((oldContacts) => {
            return [...oldContacts, { ...contact, id: key() }];
        });

        // clean contact
        setContact(() => {
            return { name: "", phone: "" };
        });

        // add focus
        inputName.current.focus();
    }

    // take key enter
    function enterAddContact(event) {
        if (event.code === "Enter") {
            addContact();
        }
    }

    // clean list contact
    function cleanAllList() {
        setListContacts(() => {
            return [];
        });
    }

    // remove each contact
    function removeContact(id) {
        let temporary = listContacts.filter(ct => ct.id !== id);
        setListContacts(temporary);
    }

    // keep data in locaStorage with hook useeffect
    // load contact list
    useEffect(() => {
        if (localStorage.getItem("meus_contactos") !== null) {
            setListContacts(JSON.parse(localStorage.getItem("meus_contactos")));
        }
    }, []);

    // update contacts list
    useEffect(() => {
        localStorage.setItem("meus_contactos", JSON.stringify(listContacts));
    }, [listContacts]);

    // load contact list
    useEffect(() => {
        if (localStorage.getItem("meus_contactos") !== null) {
            setListContacts(JSON.parse(localStorage.getItem("meus_contactos")));
        }
    }, []);

    // icons
    const iconList = <FontAwesomeIcon icon={faList} />
    const iconAdd = <FontAwesomeIcon icon={faCirclePlus} />
    const iconTrash = <FontAwesomeIcon icon={faTrash} />

    return (
        <>
            <div className="container-fluid title">
                <div className="row">
                    <div className="col text-center">
                        <h4 className="text-uppercase">{iconList} Lista de contactos</h4>
                    </div>
                </div>
            </div>

            <div className="container-fluid form">
                <div className="row">
                    <div className="col p-3">

                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4">

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Nome</label>
                                    <input ref={inputName} type="text" className="form-control" id="exampleFormControlInput1" placeholder="adicionar contactos"
                                        value={contact.name} onChange={addName} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Telefone</label>
                                    <input ref={inputPhone} type="text" className="form-control" id="exampleFormControlInput1" placeholder="adicionar telefone"
                                        value={contact.phone} onChange={addPhone} onKeyUp={enterAddContact} />
                                </div>

                                <div className="row mt-3">
                                    <div className="col text-start">
                                        <button onClick={addContact} type="button" className="btn btn-outline-success">
                                            {iconAdd} Adicionar
                                        </button>
                                    </div>

                                    <div className="col text-end">
                                        <button onClick={cleanAllList} type="button" className="btn btn-outline-danger">
                                            {iconTrash} Limpar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {listContacts.map((ct) => {
                return <Contact key={ct.id} id={ct.id} name={ct.name} phone={ct.phone} remove={removeContact} />
            })}
        </>
    );
}

export default Navbar;