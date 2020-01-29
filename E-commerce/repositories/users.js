const fs = require('fs');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('constructor need file name');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }
  async getAll() {
    const content = await fs.promises.readFile(this.filename, {
      encoding: 'utf-8'
    });
    console.log(content);
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');
  await repo.getAll();
};
test();
