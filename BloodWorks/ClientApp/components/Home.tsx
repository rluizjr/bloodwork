import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Welcome to blood works app!</h1>
            <p>Welcome to blood works single-page application, built with:</p>
            <ul>
                <li>ASP.NET Core</li>
                <li>React</li>
                <li>Webpack</li>
                <li>Bootstrap</li>
                <li>HighCharts</li>
            </ul>
            <p>The structure of the project is the following:</p>
            <ul>
                <li><strong>ClientApp</strong>. Folder that holds Front-End part (React).</li>
                <li><strong>Controllers</strong>. Controllers created in C#. Working as a Restful API and prepared to do CRUD operations.</li>
                <li><strong>Data</strong>. Related to the Entity framework structure. It has two files DbContext and a DbInitializer.</li>
                <li><strong>Models</strong>. It contains the file with the model of blood work structure.</li>
            </ul>
            <h4>Comments:</h4>
            <p>
                Even without knowing React, I decided to use react to prove that I can learn fast and use this knowledge to help to solve problems in the company. 
                I did my best to learn React and to use it in the take-home assignment. Thanks for the opportunity to show my skills and I hope to be approved for this test.
                
                Thank you
            </p>
        </div>;
    }
}
