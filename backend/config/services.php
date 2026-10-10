<?php

return [

    'ai' => [
        'provider' => env('AI_PROVIDER', 'anthropic'),
    ],

    'anthropic' => [
        'key' => env('ANTHROPIC_API_KEY'),
        'model' => env('ANTHROPIC_MODEL', 'claude-sonnet-4-6'),
        'base_uri' => 'https://api.anthropic.com/v1/messages',
    ],

    'openai' => [
        'key' => env('OPENAI_API_KEY'),
        'model' => env('OPENAI_MODEL', 'gpt-4o'),
        'base_uri' => 'https://api.openai.com/v1/chat/completions',
    ],

];
