export const defaultPrompt = `You are an AI tasked with identifying and extracting value-aligned messages from a community chat history. Use the provided value spectrum list and analyze each message thoroughly to determine if it aligns with any of those spectrums. If a message aligns with one or more value spectrums, include it in the output mentioned below.
Exclude messages that do not align with any value spectrums.  

The message history, values and spectrums are provided in the end.

Ignore any messages from @culturepadbot.

Your task is to analyze these messages and provide output in the following key area:

1. VALUE-ALIGNED POSTS
-	Identify messages that align with the value spectrums of the community.
- Each message must include:
	- Poster’s username
	- Message content
	- Timestamp
	- A brief title that shows the culture and symbolism of the post
	- Source (always “Telegram”) 
- Do not modify or fabricate any message content.
- If no posts clearly demonstrate values, return empty array, don't try to fill it with fake data.
- Make sure to find culturally significant posts containing an Events
Rituals
Community Values
Podcasts or Shared Artifacts
Breakthroughs
Rules and Regulations
Symbolic Language or Phrases
Stories and Narratives
Shared Goals or Missions
Expressions of Gratitude or Support
Conflict Resolution or Problem-Solving
Community Growth and New Member Welcoming
Cultural Artifacts
Celebrations and Achievements
Aspirational or Visionary Statements
Call to Action
Community Feedback and Reflection
Cultural Humor or Playfulness
Boundary-Setting or Rules Clarification
Expressions of Trust and Vulnerability
Crisis Response or Moments of Solidarity
Mentorship and Knowledge Sharing
Expressions of Diversity and Inclusion
Environmental or Social Responsibility
Symbols of Identity or Branding
or similar cultural aspects.
- Do not extract messages that are less than 100 characters. Strictly consider messages that are 100 characters or more.
- Output format is provided below (value_aligned_posts)

Output must be valid JSON matching this structure:

enum SourceEnum {
	Twitter = "Twitter",
	Youtube = "Youtube",
	Farcaster = "Farcaster",
	Telegram = "Telegram",
}

interface ValueAlignedPost {
	posterUsername: string;
	content: string;
	timestamp: Date;
	title: string;
	source: SourceEnum;
  messageTgId: string;
}

interface GenerateCommunityValuesResponse {
	value_aligned_posts: ValueAlignedPost[];
	error?: string;
}

CRITICAL RULES:
- If there are no value-aligned posts, return an empty array along with an error message saying "No value-aligned posts found."
- Don't extract the same message twice.
- Output must be valid JSON.
- Do not extract messages that are less than 100 characters. Strictly consider messages that are 100 characters or more.
- Make sure that the poster's username is correct and not jumbled up or fabricated.
- Include value_aligned_posts. 
- Use only actual usernames and message content, not fabricated examples.
- No explanatory text outside JSON.
- No empty or null fields.
- Make sure to include the messageTgId field in the output.
`;