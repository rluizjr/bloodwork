import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import * as Highcharts from "highcharts";
import { render } from 'react-dom';
import * as Util from '../utils/util';
import { BloodWork } from '../utils/util';

interface CounterState {
    first: boolean;
    bloodWorks: Util.BloodWork[] | null;
}

export class BloodWorkReport extends React.Component<RouteComponentProps<{}>, CounterState> {
    constructor() {
        super();

        this.state = { first: true, bloodWorks: null };
    }

    public render() {
        if (this.state.first) {
            fetch('api/BloodWorks')
                .then(response => response.json() as Promise<Util.BloodWork[]>)
                .then(data => {
                    this.state = { first: false, bloodWorks: data };
                    this.render();
                });
            
            return <div id="charts">
                <div id="hemoglobin">
                </div>
                <div id="hematocrit">
                </div>
                <div id="white blood cell count">
                </div>
                <div id="red blood cell count">
                </div>
                <div id="MCV">
                </div>
                <div id="MCHC">
                </div>
                <div id="RDW">
                </div>
                <div id="platelet count">
                </div>
            </div>;
        }

        this.FillChart("hemoglobin", "g/dL", this.state.bloodWorks.map(bloodWork => bloodWork.hemoglobin));
        this.FillChart("hematocrit", "%", this.state.bloodWorks.map(bloodWork => bloodWork.hematocrit));
        this.FillChart("white blood cell count", "cmm", this.state.bloodWorks.map(bloodWork => bloodWork.whiteBloodCellCount));
        this.FillChart("red blood cell count", "million cmm", this.state.bloodWorks.map(bloodWork => bloodWork.redBloodCellCount));
        this.FillChart("MCV", "fL", this.state.bloodWorks.map(bloodWork => bloodWork.mcv));
        this.FillChart("MCHC", "%", this.state.bloodWorks.map(bloodWork => bloodWork.mchc));
        this.FillChart("RDW", "%", this.state.bloodWorks.map(bloodWork => bloodWork.rdw));
        this.FillChart("platelet count", "mL", this.state.bloodWorks.map(bloodWork => bloodWork.plateletCount));
    }

    CapitalizeFirstLetter(title: string) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    FillChart(title: string, tooltip: string, data: number[]) {
        const capTitle = this.CapitalizeFirstLetter(title);

        Highcharts.chart(title, {
            title: {
                text: capTitle,
                x: -20 //center
            },
            xAxis: {
                categories: this.state.bloodWorks.map(bloodWork => Util.formatDate(bloodWork.dateCreated.toString()))
            },
            yAxis: {
                title: {
                    text: capTitle + ", " + tooltip
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: tooltip
            },
            series: [{
                name: capTitle,
                data: data
            }]
        });
    }
}
