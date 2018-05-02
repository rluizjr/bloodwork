import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import * as Util from '../utils/util';

interface BloodWorkViewState {
    bloodWork: Util.BloodWork | null;
    loading: boolean;
}

export class BloodWorkView extends React.Component<RouteComponentProps<{}>, BloodWorkViewState> {
    constructor() {
        super();
        this.state = { bloodWork: null, loading: true };
    }

    public render() {
        let parameters = this.props.match.params as params;

        //if the current state is loading connect to the api to get blood work information using the id passed in the route.
        if (this.state.loading) {
            fetch('api/BloodWorks/' + parameters.id)
                .then(response => response.json() as Promise<Util.BloodWork>)
                .then(data => {
                    this.setState({ bloodWork: data, loading: false });
                });
        }

        //if it is loading show a loading message in the screen
        return this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderView();
    }

    renderView() {
        //Creates the structure with labels and info to show
        let bloodWork = this.state.bloodWork;
        return <div>
            <h1>Blood Work</h1>
            <p>This is a simple example of a React component.</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Created Date</label>
                        </td>
                        <td>
                            {Util.formatDate(bloodWork.dateCreated.toString())}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Exam Date</label>
                        </td>
                        <td>
                            {Util.formatDate(bloodWork.examDate.toString())}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Results Date</label>
                        </td>
                        <td>
                            {Util.formatDate(bloodWork.resultsDate.toString())}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Description</label>
                        </td>
                        <td>
                            {bloodWork.description.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Hemoglobin</label>
                        </td>
                        <td>
                            {bloodWork.hemoglobin.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Hematocrit</label>
                        </td>
                        <td>
                            {bloodWork.hematocrit.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>White Blood Cell Count</label>
                        </td>
                        <td>
                            {bloodWork.whiteBloodCellCount.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Red Blood Cell Count</label>
                        </td>
                        <td>
                            {bloodWork.redBloodCellCount.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>MCV</label>
                        </td>
                        <td>
                            {bloodWork.mcv.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>MCHC</label>
                        </td>
                        <td>
                            {bloodWork.mchc.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>RDW</label>
                        </td>
                        <td>
                            {bloodWork.rdw.toString()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Platelet Count</label>
                        </td>
                        <td>
                            {bloodWork.plateletCount.toString()}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to={"/form/" + bloodWork.idBloodWorks}>
                <button style={{ display: 'block', height: '100%' }}>
                    Edit
                </button>
            </Link>
        </div>;
    }
}

//Interface created to identify the paramter id as part of match params
interface params {
    id: string;
}