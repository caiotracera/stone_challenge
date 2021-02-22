import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { StorageEngine, diskStorage } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

type IUploadConfig = {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
};

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),
  multer: {
    storage: diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'marvelstone',
    },
  },
} as IUploadConfig;
