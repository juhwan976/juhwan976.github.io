/* global module */

module.exports = {
  prompt: async ({ inquirer, args }) => {
    const defaults = {
      name: args.name,
      domain: args.domain ?? (args.name ? args.name.toLowerCase() : undefined),
    };

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'API 이름 (PascalCase, 예: Todo)',
      },
      {
        type: 'input',
        name: 'domain',
        message: '도메인 폴더명 (소문자, 예: todo)',
        default: (answers) =>
          answers.name ? answers.name.toLowerCase() : defaults.domain,
      },
    ].filter((question) => !defaults[question.name]);

    if (questions.length === 0) {
      return defaults;
    }

    const answers = await inquirer.prompt(questions);

    return {
      ...defaults,
      ...answers,
    };
  },
};

