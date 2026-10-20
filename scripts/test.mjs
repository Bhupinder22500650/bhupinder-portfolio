import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

// Compile the actual core modules with the existing TypeScript dependency.
const output = mkdtempSync(join(tmpdir(), 'portfolio-tests-'));
try {
  const program = ts.createProgram(
    ['terminal', 'assistant', 'projects', 'email', 'storage', 'theme'].map(name => resolve(`src/lib/${name}.ts`)),
    { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, rootDir: resolve('src'), outDir: output, strict: true, esModuleInterop: true, skipLibCheck: true, noEmitOnError: true },
  );
  const diagnostics = [...ts.getPreEmitDiagnostics(program), ...program.emit().diagnostics];
  if (diagnostics.length) {
    process.stderr.write(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: path => path,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    }));
    process.exitCode = 1;
  } else {
    const result = spawnSync(process.execPath, ['--test', 'tests/regressions.test.mjs'], {
      stdio: 'inherit', env: { ...process.env, PORTFOLIO_TEST_BUILD: output },
    });
    process.exitCode = result.status ?? 1;
  }
} finally {
  rmSync(output, { recursive: true, force: true });
}
