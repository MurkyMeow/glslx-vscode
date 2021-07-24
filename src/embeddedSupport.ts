import * as glslx from 'glslx';
import { TextDocument } from 'vscode';

export interface Region {
  start: number;
  end: number;
}

export interface ParsedDoc {
  source: string;
  regions: Region[];
}

export interface CompiledResult {
  id: string;
  docUri: string;
  region: Region;
  result: glslx.CompileResultIDE;
}

export function getGlslxRegions(documentText: string): Region[] {
  const regions: Region[] = [];
  const tagPattern = /glsl|vert|frag|\/\* ?glsl ?\*\/ ?/g;

  let match: RegExpExecArray | null;

  while (match = tagPattern.exec(documentText)) {
    const tickIdx = match.index + match[0].length;

    if (documentText[tickIdx] === '`') {
      // skip opening tick
      const start = tickIdx + 1;

      // find closing tick
      const end = documentText.indexOf('`', start + 1);

      if (end > 0) {
        regions.push({ start, end });
      }
    }
  }

  return regions;
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
  return region.start < offset && region.end > offset;
}
