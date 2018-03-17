/* eslint-disable  consistent-return */
import storage from 'local-storage-fallback';

export function getLsItem(key) {
  const lsItem = storage.getItem(key);

  if (!lsItem) {
    return false;
  }
  const record = JSON.parse(lsItem);
  if (!record.timestamp || !record.value) {
    return record;
  }
  return new Date().getTime() < record.timestamp && record.value;
}

export function setLsItem(name, val, expirationMin) {
  const expirationMS = expirationMin * 60 * 1000;
  const record = { value: val, timestamp: new Date().getTime() + expirationMS };
  return storage.setItem(name, JSON.stringify(record));
}
