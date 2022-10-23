import { promises as fsPromises } from "fs";

export default class Initialization {
  protected readonly path: string;

  constructor() {
    this.path = process.env.UPLOADS_DIR!;
    this.initialize()
      .then()
      .catch((err) => console.error(err));
  }

  private async initialize(): Promise<void> {
    if (!(await this.exists())) {
      try {
        await fsPromises.mkdir(this.path);
      } catch (err) {
        console.error(`Cannot create uploads folder !: ${err}`);
        process.exit(1);
      }
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fsPromises.access(this.path);
      return true;
    } catch {
      console.error("Uploads folder does not exist !");
      return false;
    }
  }
}
