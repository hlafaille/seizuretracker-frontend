import type { MoodSurveyAllowedMoods } from '$lib/dto/moodsurvey/MoodSurveyAllowedMoods';

export interface CreateMoodSurveyEntryRequest {
	currentMood: MoodSurveyAllowedMoods
}