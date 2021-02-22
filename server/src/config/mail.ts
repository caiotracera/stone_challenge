type IMailConfig = {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
};

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'equipe@marvelstone.com.br',
      name: 'Equipe | MarvelStone',
    },
  },
} as IMailConfig;
