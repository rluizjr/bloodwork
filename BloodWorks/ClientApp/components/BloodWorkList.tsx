import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as Util from '../utils/util';

interface BloodWorkListState {
    bloodWorks: Util.BloodWork[];
    loading: boolean;
}

export class BloodWorkList extends React.Component<RouteComponentProps<{}>, BloodWorkListState> {
    constructor() {
        super();
        this.state = { bloodWorks: [], loading: true };
        
        fetch('api/BloodWorks')
            .then(response => response.json() as Promise<Util.BloodWork[]>)
            .then(data => {
                this.setState({ bloodWorks: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : BloodWorkList.renderBloodWorksTable(this.state.bloodWorks);

        return <div>
            <h1>Blood Works List</h1>
            <p>This is the list of blood works.</p>
            {contents}
        </div>;
    }

    private static renderBloodWorksTable(bloodWorks: Util.BloodWork[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Create Date</th>
                    <th>Exam Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {bloodWorks.map(bloodWork =>
                    <tr key={bloodWork.idBloodWorks}>
                        <td>{Util.formatDate(bloodWork.dateCreated.toString())}</td>
                        <td>{Util.formatDate(bloodWork.examDate.toString())}</td>
                        <td>{bloodWork.description}</td>
                        <td>
                            <Link to={"/view/" + bloodWork.idBloodWorks}>
                                <button style={{ display: 'block', height: '100%' }}>
                                    Details
                                </button>
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}