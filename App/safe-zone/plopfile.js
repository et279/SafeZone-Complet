module.exports = function (plop) {
    // Register custom helpers if necessary
    plop.setHelper('pascalCase', text => {
      return text
        .replace(/(\w)(\w*)/g, function(g0,g1,g2){ return g1.toUpperCase() + g2.toLowerCase(); })
        .replace(/[^a-zA-Z0-9]/g, '');
    });
  
    plop.setHelper('camelCase', text => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
    });
  
    plop.setGenerator('component', {
      description: 'Create a new component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Component name',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/Component.tsx.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}.css',
          templateFile: 'plop-templates/Component.css.hbs',
        },
      ],
    });
  };
  
  
  