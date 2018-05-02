//File created to hold interfaces and methods that are common to different components

export interface BloodWork {
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

export function formatDate(date: string) {
    return date.substring(0, 10);
}