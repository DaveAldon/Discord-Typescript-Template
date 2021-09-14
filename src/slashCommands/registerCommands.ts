//@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `import { ${f.name} } from '${f.path}';`)

//@endindex

interface ICommands {
  [key: string]: any;
}

export const commands = () => {
  return {
    //@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `"${f.name}": ${f.name}(),`)

    //@endindex
  } as ICommands;
};
