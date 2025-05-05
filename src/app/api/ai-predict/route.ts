import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages, model = 'deepseek-ai/DeepSeek-V3-0324' } = await request.json();
  
  try {
    console.log("Calling HuggingFace API with:", { 
      model, 
      messageLength: messages.length 
    });

    const response = await fetch('https://router.huggingface.co/hyperbolic/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HF_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model,
        temperature: 0.7,
        max_tokens: 512
      })
    });

    

    if (!response.ok) throw new Error('AI prediction failed');
    
      // 👇 2. Log HuggingFace response
      console.log("HuggingFace status:", response.status);
      const data = await response.json();
      console.log("HuggingFace response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("HuggingFace error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}