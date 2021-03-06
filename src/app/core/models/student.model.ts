export interface Student{
    id: number,
    identification: string,
    identificationType: string,
    name1: string,
    name2?: string,
    lastName1: string,
    lastName2?: string,
    email?: string,
    phone?: string,
    direction?: string,
    city: string,
    studentCourses?: [],
    studentCoursesToSend?: StudentCourse [],
};

export interface StudentCourse{
    id?: number,
    idStudent: number,
    idCurso?: number,
    finalGrade: number
};