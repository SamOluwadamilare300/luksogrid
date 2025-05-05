import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { modelIds } = await request.json();
    
    const predictions = await prisma.aIPrediction.findMany({
      where: modelIds.length > 0 ? { modelId: { in: modelIds } } : {},
      include: { model: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    return NextResponse.json({ predictions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    const prediction = await prisma.aIPrediction.create({
      data: {
        modelId: data.modelId,
        modelType: data.modelType,
        model: data.model,
        asset: data.asset,
        action: data.action,
        confidence: data.confidence,
        timeframe: data.timeframe,
        reasoning: data.reasoning,
        priceTarget: data.priceTarget ?? null,
        p0: data.p0 ?? null
      },
      include: { model: { select: { name: true } } }
    });

    return NextResponse.json({ prediction });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save prediction' },
      { status: 500 }
    );
  }
}