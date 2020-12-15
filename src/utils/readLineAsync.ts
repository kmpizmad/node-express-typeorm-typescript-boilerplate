import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { stdout } from 'process';
import { createInterface } from 'readline';

export const readLineAsync = async (
  day: string,
  callback: (line: string) => any
): Promise<any> => {
  const logFile = join(__dirname, `../assets/logs/${day}.log`);

  if (!existsSync(logFile)) throw new Error('No logs found');

  const file = createInterface({
    input: createReadStream(logFile),
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
