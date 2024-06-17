import { OnGlobalQueueWaiting, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('health-check')
export class AppConsumer {

    @Process()
    transcode(job: Job) {
        console.log(`Processing job ${job.id} of type ${job.name}`);
    }

}