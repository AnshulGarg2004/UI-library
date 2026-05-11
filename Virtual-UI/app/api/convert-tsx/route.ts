import ts from 'typescript';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code: string = body.code || '';

    const result = ts.transpileModule(code, {
      compilerOptions: {
        jsx: ts.JsxEmit.Preserve,
        target: ts.ScriptTarget.ES2020,
        removeComments: false,
      },
      reportDiagnostics: false,
    });

    return NextResponse.json({ success: true, code: result.outputText });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
