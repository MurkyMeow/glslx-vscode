# glslx-vscode-literal

This is an extension of possibly [the best GLSL extension for VSCode out there](https://github.com/evanw/glslx-vscode) that adds support for tagged literals:

```
const myShader = /* glsl */`
  void main() {}
`;

const myShader = glsl`
  void main() {}
`;

const myShader = frag`
  void main() {}
`;

const myShader = vert`
  void main() {}
`;
```
