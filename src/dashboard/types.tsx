// export interface LoginData {
//     email: string;
//     password: string;
//     rememberMe: boolean;
// }

interface ResendRequest {
    email: string;
}

interface ResetPasswordRequest {
    email: string;
    newPassword: string;
    resetCode: string;
}

export interface SignUpData {
    email: string;
    password: string;
    rememberMe: boolean; 
    role: string;
}

export interface GoogleTokenData {
    credential: string;
    clientId: string | null;
    selectBy: string | null;
    role: string | null;
}


export interface AdminCreateTeacherData {
    name: string | null;
    dob: Date | null;
    contactNo: string | null;
    email: string | null;
    stream: string | null;
    sortCode: string | null;
    accountNo: string | null;
    notes: string | null;
    password: string | null;
}

export interface AdminCreateStudentData {
    teacherId: string | null;
    name: string | null;
    dob: Date | null;
    parentName: string | null;
    contactNo: string | null;
    email: string | null;
    sortCode: string | null;
    accountNo: string | null;
    stream: string | null;
    adjustments: string | null;
    notes: string | null;
    password: string | null;
}

export type InfoRequest = {
    newEmail: string;
    newPassword: string;
    oldPassword: string;
}

export interface IdentityUser {
    accessFailedCount?: number;
    claims?: any[]; 
    concurrencyStamp?: string;
    email?: string;
    emailConfirmed?: boolean;
    id?: string; 
    lockoutEnabled?: boolean;
    lockoutEnd?: Date;
    logins?: any[]; 
    normalizedEmail?: string;
    normalizedUserName?: string;
    passwordHash?: string;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    roles?: any[]; 
    securityStamp?: string;
    twoFactorEnabled?: boolean;
    userName?: string;
  }
  
  


export interface ApplicationUser extends IdentityUser {
    dob: Date | null;
    name: string | null;
    contactNo: string | null;
    sortCode: string | null;
    accountNo: string | null;
    stream: string | null;
    adjustments: string | null;
    notes: string | null;
    parentName: string | null;
    isRegistrationComplete: boolean ;
}



export interface AdminTeacher {
    applicationUserId: string;
    stream: string | null;
    sortCode: string | null;
    accountNo: string | null;
    notes: string | null;
    applicationUser: ApplicationUser;
}

export interface AdminStudent {
    applicationUserId: string;
    parentName: string | null;
    sortCode: string | null;
    accountNo: string | null;
    stream: string | null;
    adjustments: string | null;
    notes: string | null;
    applicationUser: ApplicationUser;
}



export interface Teacher {
    teacherId: string;
    name: string | null;
    messages: string | null;
    notes: string | null;
    ////applicationUser: ApplicationUser | null;
    students: Student[] | null;
    lessonEvents: LessonEvent[] | null;
    calendarEvents: CalendarEvent[] | null;
    homeworkAssignments: HomeworkAssignment[] | null;
    assessments: StudentAssessmentAssignment[] | null;
}

export interface Student {
    studentId: string;
    name: string | null;
    teacherId: string | null;
    stream: string | null;
    messages: string | null;
    stats: string | null;
    notes: string | null;
    //applicationUser: ApplicationUser | null;
    //teacher: Teacher;
    lessonEvents: LessonEvent[] | null;
    calendarEvents: CalendarEvent[] | null;
    homeworkAssignments: HomeworkAssignment[] | null;
    assessments: StudentAssessmentAssignment[] | null;
}

export interface Event {
    id: number | null;
    title: string;
    description: string | null;
    dueDate: Date | null;
    // whizzevents: CalendarEvent | null;
}

export enum HomeworkStream {
    GCSE,
    A_Level,
    SATs,
    ElevenPlus,
    IB,
    BTEC,
    ScottishHighers,
    WelshBaccalaureate
}

export enum SubmissionContentType {
    Text,
    Image,
    Document
}


export interface HomeworkAssignment extends Event {
    teacherId?: string;
    studentId: string;
    stream: HomeworkStream;
    isAssigned: boolean;
    isSubmitted: boolean;
    isGraded: boolean;
    grade?: number;
    aiFeedback?: string;
    teacherFeedback?: string;
    submissionDate?: Date;
    submissionContent?: string;
    submissionContentType?: SubmissionContentType;
    // teacher: Teacher | null;
    // student: Student | null;
    // calendarEvent: CalendarEvent | null;
}

export interface LessonEvent extends Event {
    teacherId: string | null;
    studentId: string;
    links: string | null;
    isAssigned: boolean;
    isComplete: boolean;
    completionDate: Date | null;
    // teacher: Teacher | null;
    // student: Student | null;
    //calendarEvent: CalendarEvent | null;
}

export interface StudentAssessmentAssignment extends Event {
    teacherId: string | null;
    studentId: string;
    assessmentId: number;
    isAssigned: boolean;
    isSubmitted: boolean;
    isGraded: boolean;
    duration: number | null;
    score: number | null;
    submissionDate: Date | null;
    topicScores: TopicScores | null;
    answers: ExamAnswer[] | null;
    // student: Student | null;
    // teacher: Teacher | null;
    // calendarEvent: CalendarEvent | null;
}

export interface CalendarEvent {
    id: number | null;
    teacherId: string | null;
    studentId: string | null;
    title: string;
    description: string | null;
    eventId: number;
    date: Date;
    link: string | null;
    status: string;
    // teacher: Teacher | null;
    // student: Student | null;
    //whizzevent: Event | null;
    // lesson: LessonEvent | null;
    // homework: HomeworkAssignment | null;
    // assignment: StudentAssessmentAssignment | null;
}

export interface StudentGet {
    studentId: string | null;
    auth: string | null;
}

export interface GetStudents {
    teacherId: string | null;
    students: string[] | null;
    auth: string | null;
}

export interface GetAssessments {
    assessmentId: number | null;
    students: string[] | null;
    auth: string | null;
}

export interface GetAssignments {
    assignmentId: number | null;
    students: string[] | null;
    auth: string | null;
}

export interface AssignAssessment {
    assessmentId: number;
    studentId: string;
    teacherId: string | null;
    isAssigned: boolean;
    isSubmitted: boolean;
    isGraded: boolean;
    auth: string | null;
}


export interface HomeworkUploadTxtData {
    text: string;
    id: number;
}

export interface TeacherGet {
    teacherId: string | null;
    auth: string | null;
}

export interface AdminCreateStudent {
    authDetails: AdminStudent;
    studentDetails: Student;
}

export interface AdminCreateTeacher {
    authDetails: AdminTeacher;
    teacherDetails: Teacher;
}

export interface GenerateInfo {
    id: number;
}

export interface AdminDelete {
    id: number;
    auth: string | null;
}

export interface HomeworkDelete {
    id: number;
    auth: string | null;
}

export interface TCalendarDelete {
    id: number;
    auth: string | null;
}

export interface SCalendarDelete {
    id: number;
    auth: string | null;
}

export interface LessonDelete {
    lessonId: number;
    auth: string | null;
}

export interface MutationResponse {
    success: boolean;
}

export interface HomeworkFeedbackInput {
    stream: string | null;
    instructions: string;
    submission: string;
}

export interface HomeworkFeedback {
    positives: string;
    negatives: string;
    suggestions: string;
}

export interface Assessment {
    id: number;
    title: string;
    stream: string;
    questionsWithAnswers: Question[];
}



export interface Question {
    id: number;
    parentId: number | null;
    assessmentId: number;
    media: string | null;
    code: string | null;
    topic: string;
    type: QuestionType;
    questionText: string;
    answerOptions: AnswerOption[];
    creationDate: string;
    verificationStatus: VerificationStatus;
    verifiedHumanFeedback: VerificationRecord[];
    derivedQuestions: Question[];
}

export enum QuestionType {
    Original,
    Alt,
    Synthetic
}

export enum VerificationStatus {
    Unverified,
    Verified,
    FlaggedForReview,
    Rejected
}

export interface VerificationRecord {
    id: number | null;
    questionBankId: number;
    isVerified: boolean;
    verifierId: string | null;
    verificationDate: Date | null;
    notes: string;
}

export interface AnswerOption {
    answerId: number;
    questionId: number;
    answerText: string;
    isCorrect: boolean;
}


export interface ExamAnswer {
    questionId: number;
    answerId: number;
}


export interface TopicScores {
    [key: string]: EnglishScores | MathScores | null;
}

export interface EnglishScores {
    grammar: Score | null;
    comprehension: Score | null;
}

export interface MathScores {
    algebra: Score | null;
    addition: Score | null;
}

export interface Score {
    total: number | null;
    correct: number | null;
    score: number | null;
}


export interface CombinedTopicScoresMap {
    dataKey: string | null;
    colour: string | null;
}