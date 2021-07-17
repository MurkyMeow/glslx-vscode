import * as glslx from 'glslx';

export interface GlslxRegion {
  start: number;
  end: number;
}

export interface GlslxDoc {
  source: string;
  regions: GlslxRegion[];
}

export interface GlslxResult {
  region: GlslxRegion;
  compiled: glslx.CompileResultIDE;
}

export function getGlslxRegions(documentText: string): GlslxRegion[] {
  const result: GlslxRegion[] = [];
  let startIdx = 0;
  let isInsideTag = false;

  for (let i = 0; i < documentText.length; i += 1) {
    const char = documentText[i];

    if (char === '`') {
      if (isInsideTag) {
        result.push({ start: startIdx, end: i });
      } else {
        startIdx = i;
      }
      isInsideTag = !isInsideTag;
    }
  }

  return result;
}

// replace all javascript with whitespaces and leave only glslx content
// reference: https://code.visualstudio.com/api/language-extensions/embedded-languages
export function getVirtualGlslxContent(documentText: string, region: GlslxRegion): string {
  let result = '';

  for (let i = 0; i < region.start; i += 1) {
    result += documentText[i] === '\n' ? '\n' : ' '
  }
  for (let i = region.start + 1; i < region.end; i += 1) {
    result += documentText[i];
  }
  for (let i = region.end + 1; i < documentText.length; i += 1) {
    result += documentText[i] === '\n' ? '\n' : ' '
  }

  return result;
}

export function isPositionInsideRegion(region: GlslxRegion, offset: number): boolean {
  return region.start > offset && region.end < offset;
}
