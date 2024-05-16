import React from 'react';
import { capitalizeWords } from '../utils/utils';

function AdminDeliveries(props) {


    return (
        <div className="container-fluid p-0">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="white_card card_height_100 mb_30">
                        <div className="white_card_header">
                            <div className="box_header m-0">
                                <div className="main-title">
                                    <h2 className="m-0">{capitalizeWords(props.type)} Deliveries</h2>
                                </div>
                            </div>
                        </div>
                        <div className="white_card_body">
                            <div className="QA_section">
                                <div className="table-responsive">
                                    <table className="table table-striped table-admin">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Sender</th>
                                                <th scope="col">Last</th>
                                                <th scope="col">Status</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td className='completed'>completed</td>
                                                <td><span className='view-button'>View</span></td>
                                                
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td className='pending'>pending</td>
                                                <td><span className='view-button'>View</span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>the Bird</td>
                                                <td className='unprocessed'>Unprocessed</td>
                                                <td><span className='view-button'>View</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminDeliveries