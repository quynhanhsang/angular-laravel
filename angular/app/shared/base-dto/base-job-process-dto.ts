import { JobResult, JobState } from 'src/app/common/models/job-model';
export class BaseJobProcessingDto {
    id: string;
    jobState: JobState;
    jobResult: JobResult;
    jobMessage: string;

    jobExecutingBeginTime: Date;
    jobExecutingEndTime: Date;

    jobProcessingPercentage: number;
    jobProcessingMessage: string;
}