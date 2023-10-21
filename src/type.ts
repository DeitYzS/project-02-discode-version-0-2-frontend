export interface StudentItem {
    id: number,
    studentId: number,
    name:string,
    surname:string,
    image:string[],
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
    image:string[],
    roles: string[]
}

export interface CommentItem {
    id: string
    text: string
    author: number
  }