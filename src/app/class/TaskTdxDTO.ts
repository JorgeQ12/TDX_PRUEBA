export class TaskTdxDTO {
    taskNameDTO: string;
    taskDescriptionDTO: string;
    idStateTaskDTO: string;

    constructor(item?: TaskTdxDTO){
        this.taskNameDTO = item?.taskNameDTO ?? "";
        this.taskDescriptionDTO = item?.taskDescriptionDTO ?? "";
        this.idStateTaskDTO = item?.idStateTaskDTO ?? "";
    }
}
