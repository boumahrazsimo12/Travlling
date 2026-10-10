<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class AIPlannerService
{
    /**
     * Generate a structured Morocco itinerary via a real LLM call.
     *
     * @param  array{destination?:string,days:int,budget:float,travel_style:string,interests:array}  $input
     * @return array Parsed itinerary matching the frontend's AIItinerary shape.
     */
    public function generate(array $input): array
    {
        $provider = config('services.ai.provider', 'anthropic');

        $prompt = $this->buildPrompt($input);

        $raw = $provider === 'openai'
            ? $this->callOpenAI($prompt)
            : $this->callAnthropic($prompt);

        return $this->parseItinerary($raw, $input);
    }

    protected function buildPrompt(array $input): string
    {
        $destination = $input['destination'] ?? 'the best regions of Morocco for this trip';
        $interests = empty($input['interests']) ? 'a balanced mix of culture, food, and nature' : implode(', ', $input['interests']);

        return <<<PROMPT
        You are a professional Morocco travel concierge. Build a realistic, day-by-day
        itinerary for a trip with these constraints:

        - Preferred destination/region: {$destination}
        - Trip length: {$input['days']} days
        - Total budget: {$input['budget']} MAD
        - Travel style: {$input['travel_style']}
        - Interests: {$interests}

        Use real Moroccan cities, neighborhoods, and landmark names. Keep costs realistic
        in Moroccan Dirham (MAD) and make sure the sum of all days' estimated_cost is close
        to the total budget without exceeding it.

        Respond with ONLY valid JSON (no markdown fences, no preamble) matching exactly
        this shape:

        {
          "title": string,
          "summary": string (2-3 sentences),
          "currency": "MAD",
          "total_estimated_cost": number,
          "days": [
            {
              "day": number,
              "title": string,
              "estimated_cost": number,
              "items": [
                { "time": string, "activity": string, "location": string, "notes": string }
              ]
            }
          ]
        }
        PROMPT;
    }

    protected function callAnthropic(string $prompt): string
    {
        $key = config('services.anthropic.key');
        if (! $key) {
            throw new RuntimeException('ANTHROPIC_API_KEY is not configured on the server.');
        }

        $response = Http::withHeaders([
            'x-api-key' => $key,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ])->timeout(60)->post(config('services.anthropic.base_uri'), [
            'model' => config('services.anthropic.model'),
            'max_tokens' => 4000,
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        if ($response->failed()) {
            Log::error('Anthropic planner call failed', ['body' => $response->body()]);
            throw new RuntimeException('The AI planner is temporarily unavailable. Please try again.');
        }

        $blocks = $response->json('content', []);
        $text = collect($blocks)->firstWhere('type', 'text')['text'] ?? '';

        if (! $text) {
            throw new RuntimeException('The AI planner returned an empty response.');
        }

        return $text;
    }

    protected function callOpenAI(string $prompt): string
    {
        $key = config('services.openai.key');
        if (! $key) {
            throw new RuntimeException('OPENAI_API_KEY is not configured on the server.');
        }

        $response = Http::withToken($key)
            ->timeout(60)
            ->post(config('services.openai.base_uri'), [
                'model' => config('services.openai.model'),
                'messages' => [
                    ['role' => 'system', 'content' => 'You respond with only valid JSON, never markdown.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'response_format' => ['type' => 'json_object'],
            ]);

        if ($response->failed()) {
            Log::error('OpenAI planner call failed', ['body' => $response->body()]);
            throw new RuntimeException('The AI planner is temporarily unavailable. Please try again.');
        }

        return $response->json('choices.0.message.content', '');
    }

    protected function parseItinerary(string $raw, array $input): array
    {
        // Defensive cleanup in case the model wraps the JSON in fences anyway.
        $clean = trim(preg_replace('/^```(json)?|```$/m', '', $raw));

        $data = json_decode($clean, true);

        if (json_last_error() !== JSON_ERROR_NONE || ! is_array($data)) {
            Log::error('Failed to parse AI itinerary JSON', ['raw' => $raw]);
            throw new RuntimeException('The AI planner returned an unexpected format. Please try again.');
        }

        // Fill in sane defaults if the model omitted anything.
        $data['currency'] = $data['currency'] ?? 'MAD';
        $data['total_estimated_cost'] = $data['total_estimated_cost'] ?? $input['budget'];
        $data['days'] = $data['days'] ?? [];

        return $data;
    }
}
