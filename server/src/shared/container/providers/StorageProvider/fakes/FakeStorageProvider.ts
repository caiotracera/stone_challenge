import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(eachFile => eachFile === file);

    this.storage.splice(fileIndex, 1);
  }
}
