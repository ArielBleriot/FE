export interface ProjectDto {
    id:number;
    studentId:number;
    title: string;
    status: string;
    description: string;
    skills: string[];
    fieldOfStudy: string;
    imageUrl: string;
    comments:any[];
    studentName:string;
  }