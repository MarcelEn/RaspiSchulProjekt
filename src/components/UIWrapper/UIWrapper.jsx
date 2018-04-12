import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import NavItem from './NavItem';


const UIWrapper = props => (
    <BrowserRouter>
        <div>
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Kalender Planer
                </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {
                            props.links.map((link, index) => (
                                <NavItem
                                    eventKey={index + 1}
                                    key={'link-' + index}
                                    {...link}
                                />
                            ))
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {
                props.children
            }
        </div>
    </BrowserRouter>
)

export default UIWrapper;

