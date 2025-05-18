export interface UserAnswerInterface { 
    questionId: number; 
    userId: number; 
    selectedAnswer: string;
    answeredAt: string;
    isCorrect: boolean;
    pointsAwarded: number;
}