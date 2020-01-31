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
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8'
      })
    );
  }
  async create(attrs) {
    const records = await this.getAll();
    records.push(attrs);

    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');
  await repo.create({ email: 'bashiroghlu@gmail.com', password: '12345' });
  let users = await repo.getAll();
  console.log(users);
};

test();
