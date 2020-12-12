import { createReadStream } from 'fs';
import { join } from 'path';
import { stdout } from 'process';
import { createInterface } from 'readline';

export const readLineAsync = async (
  day: string,
  callback: (line: string) => any
): Promise<any> => {
  const file = createInterface({
    input: createReadStream(join(__dirname, `../../assets/logs/${day}.log`)),
    output: stdout,
    terminal: false,
  });

  return new Promise((resolve, _reject) => {
    file.on('line', (line) => {
      callback(line);
    });
    file.on('close', () => {
      resolve('');
    });
  });
};
