import { promises as fsPromises } from "fs";

export default class Initialization {
  protected readonly path: string;

  constructor() {
    if (!process.env.DIR_UPLOADS) {
      console.error("DIR_UPLOADS is not defined in environment file !");
      process.exit(1);
    }

    this.path = process.env.DIR_UPLOADS;
    this.initialize()
      .then()
      .catch((err) => console.log(err));
  }

  private async initialize(): Promise<void> {
    if (!await this.exists()) {
      await fsPromises.mkdir(this.path);
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fsPromises.access(this.path);
      return true;
    } catch {
      return false;
    }
  }
}
