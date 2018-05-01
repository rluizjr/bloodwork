import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface BloodWorkListState {
    bloodWorks: BloodWork[];
    loading: boolean;
}

export class BloodWorkList extends React.Component<RouteComponentProps<{}>, BloodWorkListState> {
    constructor() {
        super();
        this.state = { bloodWorks: [], loading: true };
        
        fetch('api/BloodWorks')
            .then(response => response.json() as Promise<BloodWork[]>)
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

    private static renderBloodWorksTable(bloodWorks: BloodWork[]) {
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
                        <td>{bloodWork.dateCreated}</td>
                        <td>{bloodWork.examDate}</td>
                        <td>{bloodWork.description}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
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
    MCV: number;
    MCHC: number;
    RDW: number;
    PlateletCount: number;
}
