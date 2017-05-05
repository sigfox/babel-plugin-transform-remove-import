import { transform } from 'babel-core'
import plugin from '../src/'


const compile = (code) =>  transform(code,  {
  plugins: [plugin],
}).code

const compileWithExtensions = (code) =>  transform(code,  {
  plugins: [[plugin, {
    extensions: ['scss']
  }]],
}).code

const parse = (value) => value.replace(/\t|\n|\r| /g, '')

const expected = parse(`
  function foo() {
    blah();
  }
  export default foo;
`)

const expectedWithExtensions = parse(`
  import another from 'another';
  function foo() {
    blah();
  }
  export default foo;
`)


describe("remove-import-plugin", () => {

  it("import default from value.scss", () => {
    const source = `
      import strman from 'strman.scss'
      import another from 'another'
      function foo() {
        blah();
      }
      export default foo;
    `
    expect(parse(compileWithExtensions(source))).toBe(expectedWithExtensions);
  })

  it("import default from value", () => {
    const source = `
      import strman from 'strman'
      function foo() {
        blah();
      }
      export default foo;
    `
    expect(parse(compile(source))).toBe(expected);
  })

  it("import { default } from value", () => {
    const source = `
      import { strman } from 'strman'
      function foo() {
        blah();
      }
      export default foo;
    `
    expect(parse(compile(source))).toBe(expected);
  })

  it("import * as default from value", () => {
    const source = `
      import * as strman from 'strman'
      function foo() {
        blah();
      }
      export default foo;
    `
    expect(parse(compile(source))).toBe(expected);
  })

  it("import default, { another as another1 } from value", () => {
    const source = `
      import strman, { replace as repl } from 'strman'
      function foo() {
        blah();
      }
      export default foo;
    `
    expect(parse(compile(source))).toBe(expected);
  })
})
