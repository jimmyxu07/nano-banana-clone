import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://breakout.wenwen-ai.com/v1",
  apiKey: "sk-19pDLtkS7QhsAyiTuqXSFDfBAezjGzs2oPZ0agndx7JFTMXp",
  defaultHeaders: {
    "HTTP-Referer": "https://nano-banana-clone.vercel.app",
    "X-Title": "Nano Banana Clone",
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Image and prompt are required' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = image.type;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    console.log('Processing image with WenWen AI API...');

    // Create the chat completion request using exact format from example
    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash-image-preview",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt,
            },
            {
              "type": "image_url",
              "image_url": {
                "url": dataUrl,
              },
            },
          ],
        },
      ],
    });

    // Debug: Log the entire completion object to understand the response format
    console.log('API Response Structure:', JSON.stringify(completion, null, 2));

    // Check if completion has the expected structure
    if (!completion) {
      throw new Error('API returned empty response');
    }

    if (!completion.choices || !Array.isArray(completion.choices) || completion.choices.length === 0) {
      console.error('Invalid choices structure:', completion);
      throw new Error('API response missing choices array');
    }

    const response = completion.choices[0].message?.content;

    return NextResponse.json({
      success: true,
      response: response,
    });

  } catch (error) {
    console.error('Error generating image:', error);

    // Handle detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // Check for specific model channel errors
      if (error.message.includes('无可用渠道') || error.message.includes('No available channels')) {
        return NextResponse.json(
          {
            error: 'Model Configuration Required',
            details: 'The image processing model is not available. Please configure the model channels in your WenWen AI dashboard.',
            action: 'Visit https://breakout.wenwen-ai.com/ to configure model channels',
            model: 'google/gemini-2.5-flash-image-preview'
          },
          { status: 503 }
        );
      }

      // Check for model not found errors
      if (error.message.includes('model_not_found')) {
        return NextResponse.json(
          {
            error: 'Model Not Available',
            details: 'The specified model is not available. Please check available models in your WenWen AI dashboard.',
            action: 'Available models may be different. Contact support if needed.'
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to generate image',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}