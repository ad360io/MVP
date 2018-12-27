# Style Guide for Qchain frontend

This guide should be updated and consistently followed by developers working on this project
for maintainablity and readability.

## Naming Convention
- Module level components or variable should be PascalCased (Example. `SomeComponent.js`).
- Local javascript variables should be camelCased (Example. `const someVariable`).
- HTML/CSS className should be separated-by-dashes (Example. `className='some-class-name'`).
- Component essential files should be named with component tag (Example. `Xyz.component.js`). 
- Component props should be camelCased.
- JSON properties, state properties should be camelCased (Example. `{ someValue: 'some value'}`).
## Spacing
- Use 4 spaces as indentation instead of hard tabs.
- Insert 2 line breaks after the last import statement to separate from the main logic.
- Insert 2 line breaks before the first export statement to separate from the main logic.
- Group import components by its usage logics.
- Use single quotation first. 
- Modules called by using curly braces should be spaced (Example. `{ SomeComponent }`).
- Wisely use spacing to improve readablity.
## CSS
- Avoid using `!important`.
- Mobile first development, avoid overwriting styles too often.
- Many reuseable components has styles that needs to be overwritten, comment if nested CSS is needed to go under unclear structure. 
- Inline CSS should be short and clear, otherwise should be moved to a JSON or external CSS file.
## Design Choices
- Use stateless functional component whenever a component shall not be attached to React Component lifecycle methods.
