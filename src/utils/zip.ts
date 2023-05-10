import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate';
import { pack, unpack } from 'rrweb';

const logger = console;

export class ZipUtils {
  static b64Pack(value: any): string {
    return Buffer.from(pack(value)).toString('base64');
  }

  static b64Unpack<T = any>(value: string): T | undefined {
    try {
      return unpack(Buffer.from(value, 'base64').toString()) as any;
    } catch (_err) {
      logger.error(`Error b64Unpack`, _err);
      return undefined;
    }
  }

  static toB64Zlib<T>(value: T): string {
    const jsonEnconded = JSON.stringify(value);
    const buff = Buffer.from(jsonEnconded);
    const zlibResult = zlibSync(buff);
    const b64Str = Buffer.from(zlibResult).toString('base64');
    return b64Str;
  }

  static fromB64Zlib<T>(value: any): T {
    const buff = Buffer.from(value, 'base64');
    const zlibResult = unzlibSync(buff);
    const strResult = Buffer.from(zlibResult).toString('utf-8');
    const jsonResult = JSON.parse(strResult);
    return jsonResult;
  }

  static tryUnpack<T>(value: any): T | undefined {
    try {
      return this.b64Unpack(value) || this.unZlib(value);
    } catch (error) {
      return undefined;
    }
  }

  static unZlib<T>(value: any): T | undefined {
    try {
      const strResult = strFromU8(unzlibSync(strToU8(value, true)));
      const jsonResult = JSON.parse(strResult);
      return jsonResult;
    } catch (error) {
      logger.error(`Error running unZlib`, error);
      return undefined;
    }
  }
}
