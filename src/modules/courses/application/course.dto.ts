export interface CourseResponseDTO {
	id: string;
	title: string;
	completion: CompletionDTO;
}

export interface CompletionDTO {
	total_lessons: number;
	completed_lessons: number;
	percentage: number;
}
