import * as glslx from 'glslx';

export interface Region {
  start: number;
  end: number;
}

export interface ParsedDoc {
  source: string;
  regions: Region[];
}

export interface CompiledResult {
  region: Region;
  result: glslx.CompileResultIDE;
}

export function getGlslxRegions(documentText: string): Region[] {
  const result: Region[] = [];
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
export function getVirtualGlslxContent(documentText: string, region: Region): string {
  let result = '';
  let i = 0;

  for (; i < region.start; i += 1) {
    result += documentText[i] === '\n' ? '\n' : ' '
  }
  for (; i < region.end; i += 1) {
    result += documentText[i];
  }
  for (; i < documentText.length; i += 1) {
    result += documentText[i] === '\n' ? '\n' : ' '
  }

  return result;
}

export function isPositionInsideRegion(region: Region, offset: number): boolean {
  return region.start > offset && region.end < offset;
}
