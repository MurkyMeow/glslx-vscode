# glslx-vscode-literal

This is a fork of possibly [the best GLSL extension for VSCode out there](https://github.com/evanw/glslx-vscode) that adds support for tagged literals:

```js
const myShader = glsl`
  void main() {} // syntax highlighting, hints, errors, go-to definition, rename features here
`;

const myShader = frag`
  void main() {}
`;

const myShader = vert`
  void main() {}
`;

const myShader = /* glsl */ `
  void main() {}
`;
```
