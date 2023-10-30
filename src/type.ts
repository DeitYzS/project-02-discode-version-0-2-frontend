export interface StudentItem {
    id: number,
    studentId: string,
    name:string,
    surname:string,
    images:string[],
    advisor: AdvisorItem
    comments: CommentItem[],
    course_list:string[]
    roles: string[]
}

export interface AdvisorItem {
    id: number,
    name:string,
    surname: string,
    email:string,
    images:string[],
    roles: string[]
    studentList:string[]
}

export interface AnnItem {
    id: number;
    title: string;
    description: string;
    files: string[]; // Adjust the type if necessary
    advisor: AdvisorItem;
    [key: string]: any; // Add an index signature for dynamic properties
}

export interface CommentItem {
    id: number
    text: string
    sentByAdvisor: false
    history: HistoryCommentItem
}

export interface HistoryCommentItem {
    id: number
    studentId: number
    advisorId: number
    commentHistory: CommentItem[]
}