import text from '@openinf/util-text';
import url from 'url';
import { chalk, echo, os, path } from 'zx';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper to make it possible to use absolute project paths.
 * @param  {string} relativePath A path relative to the project root
 * @return {string} An absolute ready-to-use path
 */
function absolute(relativePath) {
  return path.resolve(path.dirname(path.dirname(__dirname)), relativePath);
}

/**
 * Various paths that are critical to the project and used throughout.
 */
export const PATHS = {
  projectRoot: absolute('.'),
  manifest: absolute('./package.json'),
};

function taskURLToRelativePath(taskURL) {
  const taskPath = url.fileURLToPath(taskURL);
  return path.relative(PATHS.projectRoot, taskPath);
}

export function echoTaskRunning(taskName, taskURL) {
  echo(
    chalk.cyan(
      `${
        os.EOL +
        String(text.UnicodeEscapes.midlineEllipsis)
          .padStart(3, ' ')
          .padEnd(5, ' ')
      } Running task named ${text.curlyQuote(taskName)}, which executes ${
        os.EOL +
        String(text.UnicodeEscapes.midlineEllipsis)
          .padStart(3, ' ')
          .padEnd(6, ' ') +
        text.curlyQuote(taskURLToRelativePath(taskURL)) +
        os.EOL
      }`
    )
  );
}
