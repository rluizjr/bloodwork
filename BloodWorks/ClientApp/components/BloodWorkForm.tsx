import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import * as Util from '../utils/util';

interface BloodWorkFormState {
    bloodWork: Util.BloodWork | null;
    loading: boolean;
    insert: boolean;
    redirect: boolean;
}

export class BloodWorkForm extends React.Component<RouteComponentProps<{}>, BloodWorkFormState> {
    constructor() {
        super();
        this.state = { bloodWork: null, loading: true, insert: true, redirect: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        //Get paramters passed in the route to check if it is a new blood work or a update.
        let parameters = this.props.match.params as params;

        if (this.state.loading && parameters.id != 'new') {
            this.state = { bloodWork: null, loading: true, insert: false, redirect: false };
            fetch('api/BloodWorks/' + parameters.id)
                .then(response => response.json() as Promise<Util.BloodWork>)
                .then(data => {
                    this.setState({ bloodWork: data, loading: false, insert: false, redirect: false });
                });
        } else if (this.state.loading) {
            this.setState({ bloodWork: null, loading: false, insert: true, redirect: false });
        }

        //If the action is done redirects to the list view
        if (this.state.redirect) {
            return <Redirect to='/list' />;
        }

        //If information still loading it shows loading message else it is going to render the form
        return this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm();
    }

    renderForm() {
        //Method created to render the form.
        //Input fields default values shows empty when the user is creating a new work blood and the registered information when the user is updating info.
        let bloodWork = this.state.bloodWork;
        return <div>
            <h1>Blood Work</h1>
            <p>This is the form to insert and update blood works.</p>
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Created Date</label>
                            </td>
                            <td>
                                <input id='dateCreated' name='dateCreated' type='date' defaultValue={bloodWork == null ? '' : Util.formatDate(bloodWork.dateCreated.toString())} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Exam Date</label>
                            </td>
                            <td>
                                <input id='examDate' name='examDate' type='date' defaultValue={bloodWork == null ? '' : Util.formatDate(bloodWork.examDate.toString())} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Results Date</label>
                            </td>
                            <td>
                                <input id='resultsDate' name='resultsDate' type='date' defaultValue={bloodWork == null ? '' : Util.formatDate(bloodWork.resultsDate.toString())} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Description</label>
                            </td>
                            <td>
                                <input id='description' name='description' type='text' minLength={3} maxLength={10} defaultValue={bloodWork == null ? '' : bloodWork.description.toString()} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Hemoglobin</label>
                            </td>
                            <td>
                                <input id='hemoglobin' name='hemoglobin' type='number' defaultValue={bloodWork == null ? '' : bloodWork.hemoglobin.toString()} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Hematocrit</label>
                            </td>
                            <td>
                                <input id='hematocrit' name='hematocrit' type='number' defaultValue={bloodWork == null ? '' : bloodWork.hematocrit.toString()} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>White Blood Cell Count</label>
                            </td>
                            <td>
                                <input id='whiteBloodCellCount' name='whiteBloodCellCount' type='number' defaultValue={bloodWork == null ? '' : bloodWork.whiteBloodCellCount.toString()} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Red Blood Cell Count</label>
                            </td>
                            <td>
                                <input id='redBloodCellCount' name='redBloodCellCount' type='number' defaultValue={bloodWork == null ? '' : bloodWork.redBloodCellCount.toString()} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>MCV</label>
                            </td>
                            <td>
                                <input id='MCV' name='MCV' type='number' defaultValue={bloodWork == null ? '' : bloodWork.mcv.toString()} required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>MCHC</label>
                            </td>
                            <td>
                                <input id='MCHC' name='MCHC' type='number' defaultValue={bloodWork == null ? '' : bloodWork.mchc.toString()} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>RDW</label>
                            </td>
                            <td>
                                <input id='RDW' name='RDW' type='number' defaultValue={bloodWork == null ? '' : bloodWork.rdw.toString()} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Platelet Count</label>
                            </td>
                            <td>
                                <input id='plateletCount' name='plateletCount' type='number' defaultValue={bloodWork == null ? '' : bloodWork.plateletCount.toString()} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button>Save</button>
            </form>
        </div>;
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const form = new FormData(event.target); //get form data
        const bloodWork = this.getFormInformation(form); //converts form data in a blood work object

        const id = this.state.insert ? "" : bloodWork.idBloodWorks.toString(); // check if it is a insert or a update
        const method = this.state.insert ? "POST" : "PUT"; //If it is a update uses PUT. if it is a insert uses POST.

        fetch('api/BloodWorks/' + id, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bloodWork)
        })
            .then(response => {
                response.json().then(data => {
                    this.setState({ bloodWork: data, loading: false, insert: this.state.insert, redirect: true });
                })
            });
    }

    //Function created to fill the information of the form in a object blood work
    getFormInformation(data: FormData) {
        let parameters = this.props.match.params as params;

        let bloodWork: Util.BloodWork = {
            idBloodWorks: this.state.insert ? 0 : +parameters.id,
            dateCreated: new Date(data.get('dateCreated') as string),
            examDate: new Date(data.get('examDate') as string),
            resultsDate: new Date(data.get('resultsDate') as string),
            description: data.get('description') as string,
            hemoglobin: +(data.get('hemoglobin') as string),
            hematocrit: +(data.get('hematocrit') as string),
            whiteBloodCellCount: +(data.get('whiteBloodCellCount') as string),
            redBloodCellCount: +(data.get('redBloodCellCount') as string),
            mcv: +(data.get('MCV') as string),
            mchc: +(data.get('MCHC') as string),
            rdw: +(data.get('RDW') as string),
            plateletCount: +(data.get('plateletCount') as string)
        }
        
        return bloodWork;
    }
}

interface params {
    id: string;
}