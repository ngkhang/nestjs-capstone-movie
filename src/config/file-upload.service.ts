import { diskStorage } from 'multer';

export enum StorageName {
  User = 'user',
}

// Handle storage upload
const storeService = (storageName: StorageName) => {
  return diskStorage({
    destination: `${process.cwd()}/public/images/${storageName}`,
    filename: (req, file, cb) => {
      const newName = `${new Date().getTime()}_${file.originalname}`;
      cb(null, newName);
    },
  });
};

export default storeService;
