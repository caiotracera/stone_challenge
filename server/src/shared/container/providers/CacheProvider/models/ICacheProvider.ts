import ISaveCacheDTO from '@shared/container/providers/CacheProvider/dtos/ISaveCacheDTO';

export default interface ICacheProvider {
  save({ key, value }: ISaveCacheDTO): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
