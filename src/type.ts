export interface StudentItem {
    id: number,
    studentId: String,
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

export interface CommentItem {
    id: number
    text: string
    author: string
  }