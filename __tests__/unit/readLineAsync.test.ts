import { today } from '../../src/utils/constants';
import { readLineAsync } from '../../src/utils/readLineAsync';

test('Logging works', async () => {
  const lines: any[] = [];
  await readLineAsync(today, (line) => lines.push(line));
  expect(lines).not.toHaveLength(0);
});
