import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface BloodWorkFormState {
    bloodWork: BloodWork | null;
    loading: boolean;
    insert: boolean;
}

export class BloodWorkForm extends React.Component<RouteComponentProps<{}>, BloodWorkFormState> {
    constructor() {
        super();
        this.state = { bloodWork: null, loading: true, insert: true };
    }

    public render() {
        let parameters = this.props.match.params as params;

        if (this.state.loading && parameters.id != 'new') {
            this.state = { bloodWork: null, loading: true, insert: false };
            fetch('api/BloodWorks/' + parameters.id)
                .then(response => response.json() as Promise<BloodWork>)
                .then(data => {
                    this.setState({ bloodWork: data, loading: false });
                });
        } else if (this.state.loading) {
            this.setState({ bloodWork: null, loading: false, insert: true });
        }

        return this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm();
    }

    renderForm() {
        let bloodWork = this.state.bloodWork;
        return <div>
            <h1>Blood Work</h1>
            <p>This is a simple example of a React component.</p>
            <form id="bloodWorkForm">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Created Date</label>
                            </td>
                            <td>
                                <input id='dateCreated' name='dateCreated' type='text' defaultValue={bloodWork == null ? '' : bloodWork.dateCreated.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Exam Date</label>
                            </td>
                            <td>
                                <input id='examDate' name='examDate' type='text' defaultValue={bloodWork == null ? '' : bloodWork.examDate.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Results Date</label>
                            </td>
                            <td>
                                <input id='resultsDate' name='resultsDate' type='text' defaultValue={bloodWork == null ? '' : bloodWork.resultsDate.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Description</label>
                            </td>
                            <td>
                                <input id='description' name='description' type='text' defaultValue={bloodWork == null ? '' : bloodWork.description.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Hemoglobin</label>
                            </td>
                            <td>
                                <input id='hemoglobin' name='hemoglobin' type='text' defaultValue={bloodWork == null ? '' : bloodWork.hemoglobin.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Hematocrit</label>
                            </td>
                            <td>
                                <input id='hematocrit' name='hematocrit' type='text' defaultValue={bloodWork == null ? '' : bloodWork.hematocrit.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>White Blood Cell Count</label>
                            </td>
                            <td>
                                <input id='whiteBloodCellCount' name='whiteBloodCellCount' type='text' defaultValue={bloodWork == null ? '' : bloodWork.whiteBloodCellCount.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Red Blood Cell Count</label>
                            </td>
                            <td>
                                <input id='redBloodCellCount' name='redBloodCellCount' type='text' defaultValue={bloodWork == null ? '' : bloodWork.redBloodCellCount.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>MCV</label>
                            </td>
                            <td>
                                <input id='MCV' name='MCV' type='text' defaultValue={bloodWork == null ? '' : bloodWork.mcv.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>MCHC</label>
                            </td>
                            <td>
                                <input id='' name='' type='' defaultValue={bloodWork == null ? '' : bloodWork.mchc.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>RDW</label>
                            </td>
                            <td>
                                <input id='MCHC' name='MCHC' type='text' defaultValue={bloodWork == null ? '' : bloodWork.rdw.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Platelet Count</label>
                            </td>
                            <td>
                                <input id='PlateletCount' name='PlateletCount' type='text' defaultValue={bloodWork == null ? '' : bloodWork.plateletCount.toString()} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => { this.save(bloodWork == null ? '' : bloodWork.idBloodWorks.toString()) }}>Save</button>
            </form>
        </div>;
    }

    save(id: string) {
        let form = document.querySelector('#bloodWorkForm');

        fetch('api/BloodWorks/' + id, {
            method: this.state.insert ? "POST" : "PUT",
            body: JSON.stringify(form)
        })
            .then(response => response.json() as Promise<BloodWork>)
            .then(data => {
                this.setState({ bloodWork: data, loading: false });
            });
    }
}

interface params {
    id: string;
}

interface BloodWork {
    idBloodWorks: number;
    dateCreated: Date;
    examDate: Date;
    resultsDate: Date;
    description: string;
    hemoglobin: number;
    hematocrit: number;
    whiteBloodCellCount: number;
    redBloodCellCount: number;
    mcv: number;
    mchc: number;
    rdw: number;
    plateletCount: number;
}
